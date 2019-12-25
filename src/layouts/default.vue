<template>
  <div>
    <router-view />
    <Navigator />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Navigator from '@/components/Navigator.vue';
export default Vue.extend({
  components: { Navigator },
});
</script>
