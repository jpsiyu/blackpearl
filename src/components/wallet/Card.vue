<template>
  <div class="card">
    <div class="card-addr">
      <span>地址:</span>
      <span>{{ currentAcc.checksumAddress }}</span>
      <span @click="detail(currentAcc.checksumAddress)">详情</span>
    </div>
    <div class="card-balance">
      <span>余额:</span>
      <span>{{ balance | inBaseUnit(currentCoin.decimals) }} </span>
      <span>{{ currentCoin.code }}</span>
      <i
        class="card-balance__reload"
        type="primary"
        @click="updateInfo"
        :class="[loading ? 'el-icon-loading' : 'el-icon-refresh']"
      ></i>
    </div>
    <div class="card-switch">
      <span>转账:</span>
      <el-switch
        class="card-switch__open"
        active-color="gold"
        v-model="open"
      ></el-switch>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState } from "vuex";
import { visitor } from "@/scripts/wallet/walletVisitor";
import { INetwork, ICoin } from "@/scripts/wallet/interfaces";
import { BIP32Node } from "@/scripts/wallet/bip32Node";
import BN from "bignumber.js";

interface IData {
  balance: string;
  loading: boolean;
  open: boolean;
}

export default Vue.extend({
  data(): IData {
    return {
      balance: "0",
      loading: false,
      open: false
    };
  },
  computed: {
    ...mapState({
      currentAcc: (state: any) => state.wallet.currentAcc as BIP32Node,
      currentNet: (state: any) => state.wallet.currentNet as INetwork,
      currentCoin: (state: any) => state.wallet.currentCoin as ICoin
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

    async updateBalance(isToken: boolean = false) {
      if (!this.currentCoin.isToken) {
        this.loading = true;
        const balance = await visitor.web3.eth.getBalance(
          this.currentAcc.checksumAddress
        );
        this.balance = balance;
        this.loading = false;
      } else {
        this.loading = true;
        const contract = visitor.loadErc20Contract(this.currentCoin.address);
        const balance = await contract.methods
          .balanceOf(this.currentAcc.address)
          .call();
        this.balance = balance;
        this.loading = false;
      }
    },

    detail(address: string) {
      const url: string = `https://cn.etherscan.com/address/${address}`;
      window.open(url, "_blank");
    }
  }
});
</script>

<style lang="postcss" scoped>
.card {
  background: seagreen;
  color: #fff;
  border-radius: 10px;
  margin: 10px;
  padding: 10px;
  width: 450px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  &-addr {
    color: whitesmoke;
    span {
      &:nth-child(1) {
        font-size: 18px;
        letter-spacing: 2px;
        font-weight: 600;
      }
      &:nth-child(2) {
        margin-left: 30px;
        color: gold;
      }
      &:nth-child(3) {
        margin-left: 10px;
        cursor: pointer;
        text-decoration: underline;
        color: deepskyblue;
      }
    }
  }
  &-balance {
    color: whitesmoke;
    margin-top: 10px;
    display: flex;
    align-items: flex-end;
    span {
      &:nth-child(1) {
        font-weight: 600;
        font-size: 18px;
        letter-spacing: 2px;
      }
      &:nth-child(2) {
        margin-left: 30px;
        font-size: 20px;
        color: gold;
        text-decoration: underline;
        font-style: italic;
      }
      &:nth-child(3) {
        font-size: 12px;
        margin-left: 10px;
      }
    }
    &__reload {
      margin-left: 20px;
      cursor: pointer;
    }
  }
  &-switch {
    color: whitesmoke;
    margin-top: 10px;
    span {
      &:nth-child(1) {
        font-weight: 600;
        font-size: 18px;
        letter-spacing: 2px;
      }
    }
    &__open {
      margin-left: 30px;
    }
  }
}
</style>
