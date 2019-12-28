import { PluginApp } from "@/scripts/app/pluginApp";
import * as bipHelper from "@/scripts/wallet/bipHelper";
import { BIP32Node } from "@/scripts/wallet/bip32Node";
import { Coin } from "@/scripts/wallet/coin";

export class Wallet extends PluginApp {
  async init() {
    if (this.hasInit) {
      return;
    }

    const wallet = this.$db.getWallet();
    if (!wallet) {
      this.$router.push({ path: "/wallet/create" });
      return;
    }

    const node = bipHelper.genBip32Node(wallet.mnemonic);
    const master = new BIP32Node(node);
    const accounts = [master];
    const currentAcc = accounts[0];

    const coins = [
      new Coin("ETH", "", false),
      new Coin("USDT", "0x123", true),
      new Coin("DAI", "0x345", true)
    ];
    const currentCoin = coins[0];

    this.$store.commit("wallet/setAccounts", accounts);
    this.$store.commit("wallet/setCurrentAcc", currentAcc);
    this.$store.commit("wallet/setCoins", coins);
    this.$store.commit("wallet/setCurrentCoin", currentCoin);

    this.hasInit = true;
  }
}
