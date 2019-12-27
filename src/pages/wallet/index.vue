<template>
  <div class="wallet">
    <div class="wallet-title">钱包</div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Wallet } from "@/scripts/db/wallet";
import * as bipHelper from "@/scripts/wallet/bipHelper";
import { BIP32Node } from "@/scripts/wallet/bip32Node";

export default Vue.extend({
  created() {
    const wallet = this.$db.getWallet();
    if (!wallet) {
      this.$router.push({ path: "/wallet/create" });
      return;
    }
    const node = bipHelper.genBip32Node(wallet.mnemonic);
    const master = new BIP32Node(node);

    console.log(master.publicKey);
    console.log(master.privateKey);
    console.log(master.address);
    console.log(master.checksumAddress);
  }
});
</script>
