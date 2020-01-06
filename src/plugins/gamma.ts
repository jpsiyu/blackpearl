import Vue from 'vue'
import Web3 from 'web3'
import deploy from '@/assets/smart-contract/deploy'
import storage from '@/scripts/dex/storage'
import store from '@/store/index'

class Gamma {
  constructor() {
    if (!(window.ethereum && window.ethereum.isMetaMask)) {
      const msg = 'Need MetaMask Support!'
      alert(msg)
      throw new Error(msg)
    }

    const web3 = new Web3(window.ethereum)
    this.dex = new web3.eth.Contract(deploy.DexABI, deploy.DexAddr)
    this.token = new web3.eth.Contract(deploy.Erc20ABI, deploy.Erc20Addr)
    this.web3 = web3

    this.initMetaMask()
    this.handleEvent()
  }

  initMetaMask() {
    window.ethereum.autoRefreshOnNetworkChange = false
    window.ethereum.on('accountsChanged', (accounts) => {
      const account = accounts[0]
      store.commit('dex/setAccount', account)
    })
  }

  subscribe() {
    if (!Vue.prototype.$eventBus) return
    const infura = new Web3('wss://ropsten.infura.io/ws/v3/9f28b75fa35c4dc2ae401196993494f5')
    infura.eth.subscribe('pendingTransactions', (error, result) => {
      console.log('pendingTransactions', result)
      Vue.prototype.$eventBus.$emit('pendingTransactions', (error, result))
    })
  }

  handleEvent() {
    this.dex.events.OnSell()
      .on('data', event => {
        storage.addOrder(event)
        Vue.prototype.$eventBus.$emit('addOrder')
      })

    this.dex.events.OnBuy()
      .on('data', event => {
        console.log('OnBuy', event)
      })
  }

  metamaskEnable() {
    return window.ethereum.enable()
  }

  dexAddr() {
    return deploy.DexAddr
  }

  tokenAddr() {
    return deploy.Erc20Addr
  }

  ethAddr() {
    return '0x0000000000000000000000000000000000000000'
  }
}

const gamma = new Gamma()
Vue.prototype.$gamma = gamma

export default gamma