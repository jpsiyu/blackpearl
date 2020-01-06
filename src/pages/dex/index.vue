<template>
  <div class="dex"></div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  created() {
    this.$router.push({ path: "dex/pair/GTM_ETH" });
  }
});
</script>
