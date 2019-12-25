<template>
  <router-view />
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  async created() {
    await this.$shh.init();
  }
});
</script>

<style lang="postcss">
html,
body,
div {
  margin: 0;
  padding: 0;
  font-size: var(--font-size);
  box-sizing: border-box;
  color: var(--color-regular-text);
}
</style>