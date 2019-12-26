<template>
  <div class="nav">
    <div class="nav-item" v-for="(item, index) in projects" :key="index" @click="handleClick(item)">
      <span>{{item.name}}</span>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  data() {
    return {};
  },
  computed: {
    projects() {
      return [
        { id: 0, name: '首页', link: '/' },
        { id: 1, name: '钱包', link: '/wallet' },
        { id: 2, name: 'DEX', link: '/dex' },
        { id: 3, name: '聊天', link: '/chat' },
        { id: 4, name: '房子', link: '/house' },
        { id: 5, name: '知识', link: '/knowledge' },
      ];
    },
  },
  methods: {
    handleClick(item: any) {
      this.$router.push({ path: item.link });
    },
  },
});
</script>

<style lang="postcss" scoped>
.nav {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  position: relative;
  &::after {
    position: absolute;
    content: "";
    background: var(--color-light-border);
    width: 650px;
    height: 0.5px;
    top: 0;
  }
  &-item {
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 10px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    box-shadow: 0 0 3px 2px rgba(0, 0, 0, 0.1);
  }
}
</style>