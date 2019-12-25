<template>
  <div class="default">
    <div class="default-main">
      <router-view />
    </div>
    <div class="default-nav">
      <Navigator />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Navigator from "@/components/Navigator.vue";
export default Vue.extend({
  components: { Navigator }
});
</script>

<style lang="postcss" scoped>
.default{
  &-nav{
    border: 1px solid red;
  }
}
</style>