<template>
  <div class="card">
    <span>地址: {{ currentAcc.checksumAddress }}</span>
    <span
      >余额: {{ balance | inBaseUnit(currentCoin.decimals) }}
      {{ currentCoin.code }}</span
    >
    <el-button
      class="card-refresh"
      type="primary"
      :loading="loading"
      @click="updateInfo"
      >刷新</el-button
    >
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState } from "vuex";
import { visitor } from "@/scripts/wallet/walletVisitor";
import { INetwork } from "@/scripts/wallet/network";
import { BIP32Node } from "@/scripts/wallet/bip32Node";
import { Coin } from "@/scripts/wallet/coin";
import BN from "bignumber.js";

interface IData {
  balance: string;
  loading: boolean;
}

export default Vue.extend({
  data(): IData {
    return {
      balance: "0",
      loading: false
    };
  },
  computed: {
    ...mapState({
      currentAcc: (state: any) => state.wallet.currentAcc as BIP32Node,
      currentNet: (state: any) => state.wallet.currentNet as INetwork,
      currentCoin: (state: any) => state.wallet.currentCoin as Coin
    })
  },
  filters: {
    inBaseUnit(value: string, decimals: number) {
      return new BN(value).dividedBy(10 ** decimals).toString();
    }
  },
  watch: {
    currentAcc: function() {
      this.handleChange();
    },
    currentCoin: function() {
      this.handleChange();
    },
    currentNet: function() {
      this.handleChange();
    }
  },
  created() {
    this.handleChange();
  },
  methods: {
    async handleChange() {
      await this.updatePrivider();
      await this.updateInfo();
    },

    async updateInfo() {
      await this.updateBalance();
    },

    async updatePrivider() {
      this.loading = true;
      const connected = await visitor.setNetwork(this.currentNet.url);
      this.loading = false;
    },

    async updateBalance() {
      this.loading = true;
      const balance = await visitor.web3.eth.getBalance(
        this.currentAcc.checksumAddress
      );
      this.balance = balance;
      this.loading = false;
    }
  }
});
</script>

<style lang="postcss" scoped>
.card {
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  &-refresh {
    margin-top: 20px;
  }
}
</style>
