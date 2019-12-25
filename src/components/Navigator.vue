<template>
  <div class="nav">
    <div class="nav-item" v-for="(item, index) in projects" :key="index">
      <span>{{item.name}}</span>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data() {
    return {};
  },
  computed: {
    projects() {
      return [
        { id: 0, name: "首页" },
        { id: 1, name: "钱包" },
        { id: 2, name: "DEX" },
        { id: 3, name: "聊天" },
        { id: 4, name: "房子" },
        { id: 5, name: "知识星球" }
      ];
    }
  }
});
</script>

<style lang="postcss" scoped>
.nav {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  &-item {
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 10px;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    box-shadow: 0 0 3px 2px rgba(0, 0, 0, 0.1);
  }
}
</style>