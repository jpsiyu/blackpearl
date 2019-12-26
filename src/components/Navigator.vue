<template>
  <div class="nav">
    <div
      class="nav-item"
      :class="{'selected': selectedId === item.id }"
      v-for="(item, index) in projects"
      :key="index"
      @click="handleClick(item)"
    >
      <span>{{item.name}}</span>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data() {
    return {
      selectedId: 0
    };
  },
  computed: {
    projects() {
      return [
        { id: 0, name: "首页", link: "/" },
        { id: 1, name: "钱包", link: "/wallet" },
        { id: 2, name: "交易", link: "/dex" },
        { id: 3, name: "聊天", link: "/chat" },
        { id: 4, name: "房子", link: "/house" },
        { id: 5, name: "知识", link: "/knowledge" }
      ];
    }
  },
  watch: {
    $route: function(val) {
      this.calSelected(val.path);
    }
  },
  created() {
    this.calSelected(this.$route.path);
  },
  methods: {
    handleClick(item: any) {
      this.$router.push({ path: item.link });
    },

    calSelected(path: string) {
      let target;
      for (let i = 0; i < this.projects.length; i++) {
        const proj = this.projects[i];
        if (proj.link === path) {
          target = proj;
          break;
        }
      }
      if (!target) {
        this.selectedId = -1;
      } else {
        this.selectedId = target.id;
      }
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
  position: relative;
  &::after {
    z-index: -1;
    position: absolute;
    content: "";
    border: 2px solid var(--color-light-border);
    border-bottom: none;
    border-radius: 50px;
    width: 500px;
    height: 80%;
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

.selected {
  background: var(--color-success);
  color: #fff;
}
</style>