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
import Vue from 'vue';
import Navigator from '@/components/Navigator.vue';
export default Vue.extend({
  components: { Navigator },
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
  display: flex;
  &-main {
    margin: auto;
    box-sizing: border-box;
    box-shadow: 0 0 3px 2px rgba(0, 0, 0, 0.1);
    width: 90%;
    height: 90%;
    min-height: 500px;
    min-width: 900px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    &-page {
      flex: 1;
      overflow: auto;
    }
    &-nav {
      height: 60px;
    }
  }
}
</style>