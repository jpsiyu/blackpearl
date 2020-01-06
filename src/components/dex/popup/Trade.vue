<template>
  <el-dialog
    :visible.sync="visible"
    :append-to-body="true"
    class="tr"
    width="500px"
  >
    <div slot="title">{{ title }}</div>
    <el-form class="tr-form" label-position="top" :model="form">
      <el-form-item :label="$t('orderBook.order')"
        >{{ amount | unit }} {{ curPair.coin }}, {{ price }}
        {{ curPair.coin }}/{{ curPair.base }}</el-form-item
      >
      <el-form-item :label="$t('balance.amount')" prop="amount">
        <el-input v-model="form.amount">
          <span slot="append">{{ curPair.coin }}</span>
        </el-input>
      </el-form-item>
      <el-form-item label="ETH">
        <el-input v-model="eth" disabled>
          <span slot="append">{{ curPair.base }}</span>
        </el-input>
      </el-form-item>
    </el-form>
    <div slot="footer">
      <el-button @click="hide">{{ $t("common.cancel") }}</el-button>
      <el-button type="primary" @click="sure">{{
        $t("common.sure")
      }}</el-button>
    </div>
    <NotifyHash ref="notifyHash" />
  </el-dialog>
</template>

<script>
import { mapState } from "vuex";
import BigNumber from "bignumber.js";
import NotifyHash from "@/components/dex/popup/NotifyHash";
import UserOrder from "@/scripts/dex/userOrder";
export default {
  components: { NotifyHash },
  data() {
    return {
      visible: false,
      userOrder: null,
      form: {
        amount: ""
      }
    };
  },
  computed: {
    ...mapState({
      account: state => state.dex.account,
      curPair: state => state.dex.curPair
    }),
    title() {
      if (!this.userOrder) return "";
      const title = this.userOrder.isBuy()
        ? this.$t("buySell.sellOrder")
        : this.$t("buySell.buyOrder");
      return title;
    },
    amount() {
      if (!this.userOrder) return "";
      return this.userOrder.amount();
    },
    price() {
      if (!this.userOrder) return "";
      return this.userOrder.price();
    },
    eth() {
      if (!this.form.amount || isNaN(this.form.amount) || !this.userOrder)
        return "";
      let eth = BigNumber(this.form.amount).multipliedBy(this.price);
      return eth.toFixed();
    }
  },
  methods: {
    show(options) {
      this.userOrder = new UserOrder(options.order);
      this.visible = true;
    },
    hide() {
      this.visible = false;
    },
    sure() {
      if (!this.eth) {
        return this.$message({ message: "Illegal trade", type: "warning" });
      }

      const pay = this.userOrder.isBuy()
        ? BigNumber(this.form.amount)
            .multipliedBy(10 ** 18)
            .toFixed()
        : BigNumber(this.eth)
            .multipliedBy(10 ** 18)
            .toFixed();

      this.$gamma.dex.methods
        .buy1(
          this.userOrder.tokenGet,
          this.userOrder.amountGet,
          this.userOrder.tokenGive,
          this.userOrder.amountGive,
          this.userOrder.expires,
          this.userOrder.clientNonce,
          this.userOrder.seller,
          pay
        )
        .send({ from: this.account })
        .on("transactionHash", hash => {
          this.$refs.notifyHash.show({ hashes: [hash] });
        })
        .on("receipt", receipt => {
          console.log("receipt", receipt);
        });
    }
  }
};
</script>
