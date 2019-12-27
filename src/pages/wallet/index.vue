<template>
  <div class="wallet">
    <div class="wallet-title">钱包</div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Wallet } from "@/scripts/db/wallet";

export default Vue.extend({
  created() {
    const wallet = this.$db.getWallet();
    if (!wallet) {
      this.$router.push({ path: "/wallet/create" });
      return;
    }
    console.log(wallet);
  }
});
</script>
