<template>
  <div class="wallet">
    <div class="wallet-main">
      <div class="wallet-main-leftWrap">
        <div class="wallet-main-left">
          <div class="wallet-acc">
            <div class="wallet-acc__name">
              <i class="fas fa-user"></i>
              <span>账号:</span>
              <span>账号1</span>
            </div>
            <div class="wallet-acc__addr">
              <i class="fas fa-address-card"></i>
              <span>地址:</span>
              <span>{{ currentAcc.checksumAddress }}</span>
            </div>
            <div class="wallet-acc__coin">
              <i class="fas fa-coins"></i>
              <span>币种:</span>
              <span>{{ currentCoin.code }}</span>
            </div>
            <div class="wallet-acc__net">
              <i class="fas fa-wifi"></i>
              <span>网络:</span>
              <span>Main Net</span>
            </div>
          </div>
          <i class="el-icon-setting wallet-main-left__setting"></i>
        </div>
      </div>
      <div class="wallet-main-rightWrap">
        <div class="wallet-main-right">
          <el-carousel type="card" height="400px" :autoplay="false">
            <el-carousel-item v-for="(item, index) in accounts" :key="index">
              <div class="wallet-card">
                <span>余额：1000eth</span>
              </div>
            </el-carousel-item>
          </el-carousel>
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
      padding: 10px;
      position: relative;
      &__setting {
        position: absolute;
        left: 10px;
        bottom: 10px;
        font-size: 22px;
        cursor: pointer;
      }
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
      padding: 10% 10px;
      overflow-y: auto;
    }
  }
  &-acc {
    & > div {
      padding: 15px 0;
      display: flex;
      align-items: center;
      i:nth-child(1) {
        width: 15px;
      }
      span:nth-child(2) {
        margin-left: 5px;
        color: var(--color-primary-text);
      }
      span:nth-child(3) {
        margin-left: 10px;
        display: inline-block;
        overflow: hidden;
        text-overflow: ellipsis;
        width: 120px;
      }
    }
  }
  &-card {
    width: 100%;
    height: 100%;
    background: #fff;
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
