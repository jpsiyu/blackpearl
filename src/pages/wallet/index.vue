<template>
  <div class="wallet">
    <div class="wallet-top">
      <div class="wallet-top-account">
        <span class="wallet-top-account__name">账号1</span>
        <span class="wallet-top-account__addr">{{
          currentAcc.checksumAddress
        }}</span>
        <span class="wallet-top-account__copy">复制</span>
      </div>
      <div class="wallet-top-net">
        <span>Main Net</span>
      </div>
    </div>
    <div class="wallet-main">
      <div class="wallet-main-left">
        <div class="wallet-token" v-for="(coin, index) in coins" :key="index">
          {{ coin.code }}
        </div>
      </div>
      <div class="wallet-main-right">
        haha
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Wallet } from "@/scripts/db/wallet";
import * as bipHelper from "@/scripts/wallet/bipHelper";
import { BIP32Node } from "@/scripts/wallet/bip32Node";
import { Coin } from "@/scripts/wallet/coin";

interface IData {
  master: BIP32Node | null;
  accounts: BIP32Node[];
  currentAcc: BIP32Node | null;
  coins: Coin[];
}

export default Vue.extend({
  data(): IData {
    return {
      master: null,
      accounts: [],
      currentAcc: null,
      coins: []
    };
  },
  created() {
    const wallet = this.$db.getWallet();
    if (!wallet) {
      this.$router.push({ path: "/wallet/create" });
      return;
    }
    const node = bipHelper.genBip32Node(wallet.mnemonic);
    this.master = new BIP32Node(node);
    this.accounts = [this.master];
    this.currentAcc = this.accounts[0];

    this.coins = [
      new Coin("ETH", "", false),
      new Coin("USDT", "0x123", true),
      new Coin("DAI", "0x345", true)
    ];
  }
});
</script>

<style lang="postcss" scoped>
.wallet {
  margin: auto;
  width: 800px;
  height: 100%;
  display: flex;
  flex-direction: column;
  &-top {
    padding: 0 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 50px;
    &-account {
      display: flex;
      align-items: center;
      height: 100%;
      span {
        margin-right: 10px;
      }
      &__copy {
        border: 1px solid var(--color-light-border);
        padding: 0 10px;
        border-radius: 20px;
        cursor: pointer;
      }
    }
  }
  &-main {
    flex: 1;
    border-top: 1px solid var(--color-light-border);
    display: flex;
    overflow: hidden;
    &-left {
      height: 100%;
      overflow-y: auto;
      width: 200px;
      border-right: 1px solid var(--color-light-border);
    }
    &-right {
      padding: 0 10px;
      height: 100%;
      overflow-y: auto;
      flex: 1;
    }
  }
  &-token {
    cursor: pointer;
    padding: 5px 20px;
    &:hover {
      background: var(--color-extra-light-border);
    }
  }
}
</style>
