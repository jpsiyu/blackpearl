<template>
  <div class="default">
    <div class="default-main">
      <div class="default-main-page">
        <router-view />
      </div>
      <div class="default-main-nav">
        <Navigator />
      </div>
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
.default {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: auto;
  &-main {
    box-sizing: border-box;
    height: 100%;
    min-width: 900px;
    min-height: 500px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    &-page {
      flex: 1;
    }
    &-nav {
      height: 100px;
      border: 1px solid green;
    }
  }
}
</style>