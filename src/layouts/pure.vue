<template>
  <div class="df">
    <Nav />
    <div class="df-page">
      <router-view />
    </div>
  </div>
</template>

<script>
import Nav from "@/components/dex/Nav";
export default {
  components: { Nav }
};
</script>

<style scoped>
.df {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.df-page {
  top: 40px;
  bottom: 0;
  left: 0;
  right: 0;
  position: absolute;
  overflow-y: auto;
}
</style>
