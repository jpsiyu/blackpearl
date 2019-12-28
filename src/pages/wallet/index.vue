<template>
  <div class="wallet">
    <div class="wallet-main">
      <div class="wallet-main-leftWrap">
        <div class="wallet-main-left">
          <div
            class="wallet-token"
            v-for="(coin, index) in coins"
            :key="index"
            :class="{ selected: currentCoin === coin }"
            @click="handleClickCoin(coin)"
          >
            {{ coin.code }}
          </div>
        </div>
      </div>
      <div class="wallet-main-rightWrap">
        <div class="wallet-main-right">
          haha
        </div>
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
  currentCoin: Coin | null;
}

export default Vue.extend({
  data(): IData {
    return {
      master: null,
      accounts: [],
      currentAcc: null,
      coins: [],
      currentCoin: null
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
    this.currentCoin = this.coins[0];
  },
  methods: {
    handleClickCoin(coin: Coin) {
      this.currentCoin = coin;
    }
  }
});
</script>

<style lang="postcss" scoped>
.wallet {
  margin: auto;
  width: 900px;
  height: 100%;
  display: flex;
  flex-direction: column;
  &-main {
    flex: 1;
    display: flex;
    overflow: hidden;
    &-leftWrap {
      padding: 20px 0;
      transform: skewY(5deg);
      height: 100%;
      overflow-y: auto;
      width: 300px;
    }
    &-left {
      width: 100%;
      height: 100%;
      overflow-y: auto;
      background: var(--color-extra-light-border);
      border-right: 1px solid var(--color-light-border);
    }
    &-rightWrap {
      flex: 1;
      height: 100%;
      padding: 32px 0 8px 0;
    }
    &-right {
      width: 100%;
      height: 100%;
      background: var(--color-extra-light-border);
      padding: 0 10px;
      overflow-y: auto;
    }
  }
  &-token {
    cursor: pointer;
    padding: 10px 20px;
    &:hover {
      background: var(--color-light-border);
    }
  }
}

.selected {
  background: var(--color-success);
  color: #fff;
  &:hover {
    background: var(--color-success);
  }
}
</style>
