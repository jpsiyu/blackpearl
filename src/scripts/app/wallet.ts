import { PluginApp } from "@/scripts/app/pluginApp";
import * as bipHelper from "@/scripts/wallet/bipHelper";
import { BIP32Node } from "@/scripts/wallet/bip32Node";
import { Coin } from "@/scripts/wallet/coin";
import { INetwork } from "@/scripts/wallet/network";
import { Child } from '@/scripts/db/wallet';

export class Wallet extends PluginApp {
  async init() {
    if (this.hasInit) {
      return;
    }

    this.loadWallet();

    this.hasInit = true;
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
      const child = master.derivePath(el.derivePath)
      child.name = el.name
      accounts.push(child)
    })

    const currentAcc = accounts[0];

    const coins = [
      new Coin("ETH", "", false),
      new Coin("USDT", "0x123", true),
      new Coin("DAI", "0x345", true)
    ];
    const currentCoin = coins[0];

    const networks: INetwork[] = [
      {
        netID: 1,
        name: "Main Ethereum Network",
        color: "darkseagreen",
        url: ""
      },
      {
        netID: 2,
        name: "Ropsten Test Network",
        color: "palevioletred",
        url: ""
      },
      { netID: 3, name: "Kovan Test Network", color: "blueviolet", url: "" },
      { netID: 4, name: "Rinkeby Test Network", color: "orange", url: "" }
    ];
    const currentNet: INetwork = networks[0];

    this.$store.commit("wallet/setMaster", master);
    this.$store.commit("wallet/setAccounts", accounts);
    this.$store.commit("wallet/setCurrentAcc", currentAcc);
    this.$store.commit("wallet/setCoins", coins);
    this.$store.commit("wallet/setCurrentCoin", currentCoin);
    this.$store.commit("wallet/setNetworks", networks);
    this.$store.commit("wallet/setCurrentNet", currentNet);
  }
}
