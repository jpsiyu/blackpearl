<template>
  <div class="card">
    <span>余额: {{ balance }}</span>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState } from "vuex";

interface IData {
  balance: string;
}

export default Vue.extend({
  data(): IData {
    return {
      balance: "1.23"
    };
  },
  computed: {
    ...mapState({
      currentAcc: (state: any) => state.wallet.currentAcc,
      currentNet: (state: any) => state.wallet.currentNet,
      currentCoin: (state: any) => state.wallet.currentCoin
    })
  },
  watch: {
    currentAcc: function() {
      this.handleChange();
    },
    currentCoin: function() {
      this.handleChange();
    },
    currentNet: function() {
      this.handleChange();
    }
  },
  created() {
    this.handleChange();
  },
  methods: {
    handleChange() {
      console.log("something change!");
    }
  }
});
</script>

<style lang="postcss" scoped>
.card {
  padding: 10px;
}
</style>
