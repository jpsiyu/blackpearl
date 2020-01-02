<template>
  <el-dialog
    class="set"
    :visible.sync="visible"
    :append-to-body="true"
    width="400px"
  >
    <div slot="title">设置</div>
    <el-form class="set-form">
      <el-form-item label="切换账号:">
        <el-select v-model="form.accIndex">
          <el-option
            v-for="(item, index) in accounts"
            :key="index"
            :label="item.name"
            :value="index"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="切换网络:">
        <el-select v-model="form.netID">
          <el-option
            v-for="item in networks"
            :key="item.netID"
            :label="item.name"
            :value="item.netID"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="切换币种:">
        <el-select v-model="form.code">
          <el-option
            v-for="item in coins"
            :key="item.code"
            :label="item.code"
            :value="item.code"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer">
      <el-button @click="hide">取消</el-button>
      <el-button @click="sure" type="primary">确定</el-button>
    </div>
  </el-dialog>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState } from "vuex";
import { INetwork } from "../../scripts/wallet/network";
import { Coin } from "../../scripts/wallet/coin";
import { BIP32Node } from "@/scripts/wallet/bip32Node";

interface IData {
  visible: boolean;
  form: {
    netID: number;
    code: string;
    accIndex: number;
  };
}

export default Vue.extend({
  data(): IData {
    return {
      visible: false,
      form: {
        netID: 0,
        code: "",
        accIndex: 0
      }
    };
  },
  computed: {
    ...mapState({
      networks: (state: any) => state.wallet.networks,
      currentNet: (state: any) => state.wallet.currentNet,
      currentCoin: (state: any) => state.wallet.currentCoin,
      accounts: (state: any) => state.wallet.accounts,
      currentAcc: (state: any) => state.wallet.currentAcc
    }),

    coins: function() {
      return this.currentNet.coins;
    }
  },
  created() {
    this.form.netID = this.currentNet.netID;
    this.form.code = this.currentCoin.code;
    this.form.accIndex = this.accounts.findIndex((el: BIP32Node) => {
      return el.address === this.currentAcc.address;
    });
  },
  methods: {
    show() {
      this.visible = true;
    },
    hide() {
      this.visible = false;
    },
    sure() {
      const selectedNetwork = this.networks.find((el: INetwork) => {
        return el.netID === this.form.netID;
      });
      const selectedCoin = this.coins.find((el: Coin) => {
        return el.code === this.form.code;
      });
      const selectedAcc = this.accounts[this.form.accIndex];
      this.$store.commit("wallet/setCurrentNet", selectedNetwork);
      this.$store.commit("wallet/setCurrentCoin", selectedCoin);
      this.$store.commit("wallet/setCurrentAcc", selectedAcc);
      this.hide();
    }
  }
});
</script>

<style lang="postcss" scoped>
.set {
  &-form {
    .el-select {
      width: 200px;
    }
  }
}
</style>
