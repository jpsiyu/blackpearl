import { PluginApp } from "@/scripts/app/pluginApp";
import * as bipHelper from "@/scripts/wallet/bipHelper";
import { BIP32Node } from "@/scripts/wallet/bip32Node";
import { Coin } from "@/scripts/wallet/coin";
import { INetwork } from "@/scripts/wallet/network";
import { Child } from "@/scripts/db/wallet";

export class Wallet extends PluginApp {
  async init() {
    if (this.hasInit) {
      return;
    }

    this.loadWallet();

    this.hasInit = true;
  }

  get networks(): INetwork[] {
    const nets = [
      {
        netID: 1,
        name: "Main Ethereum Network",
        color: "darkseagreen",
        url: "https://mainnet.infura.io/v3/9f28b75fa35c4dc2ae401196993494f5",
        coins: [
          new Coin("ETH", "", false),
          new Coin("USDT", "0xdac17f958d2ee523a2206206994597c13d831ec7", true),
          new Coin("DAI", "0x6b175474e89094c44da98b954eedeac495271d0f", true)
        ]
      },
      {
        netID: 2,
        name: "Ropsten Test Network",
        color: "palevioletred",
        url: "https://ropsten.infura.io/v3/9f28b75fa35c4dc2ae401196993494f5",
        coins: [
          new Coin("ETH", "", false),
        ]
      },
      {
        netID: 3,
        name: "Kovan Test Network",
        color: "blueviolet",
        url: "https://kovan.infura.io/v3/9f28b75fa35c4dc2ae401196993494f5",
        coins: [
          new Coin("ETH", "", false),
        ]
      },
      {
        netID: 4,
        name: "Rinkeby Test Network",
        color: "orange",
        url: "https://rinkeby.infura.io/v3/9f28b75fa35c4dc2ae401196993494f5",
        coins: [
          new Coin("ETH", "", false),
        ]
      }
    ]
    return nets
  }

  loadWallet() {
    const wallet = this.$db.getWallet();
    if (!wallet) {
      this.$router.push({ path: "/wallet/create" });
      return;
    }

    const node = bipHelper.genBip32Node(wallet.mnemonic);
    const master = new BIP32Node(node);
    master.isMaster = true;

    const accounts = [master];
    wallet.children.forEach((el: Child) => {
      const child = master.derivePath(el.derivePath);
      child.name = el.name;
      accounts.push(child);
    });

    const currentAcc = accounts[0];

    const currentNet: INetwork = this.networks[0]
    const currentCoin = currentNet.coins[0]

    this.$store.commit("wallet/setMaster", master);
    this.$store.commit("wallet/setAccounts", accounts);
    this.$store.commit("wallet/setCurrentAcc", currentAcc);
    this.$store.commit("wallet/setCoins", currentNet.coins);
    this.$store.commit("wallet/setCurrentCoin", currentCoin);
    this.$store.commit("wallet/setNetworks", this.networks);
    this.$store.commit("wallet/setCurrentNet", currentNet);
  }
}
