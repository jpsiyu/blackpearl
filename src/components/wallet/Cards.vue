<template>
  <div class="cards">
    <el-carousel
      type="card"
      height="350px"
      :autoplay="false"
      @change="handleCardChange"
    >
      <el-carousel-item v-for="(item, index) in accounts" :key="index">
        <div
          class="cards-card"
          :class="{ selected: index === activeCardIndex }"
        >
          <span>余额：1000eth</span>
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState } from "vuex";

interface IData {
  activeCardIndex: number;
}

export default Vue.extend({
  data(): IData {
    return {
      activeCardIndex: 0
    };
  },
  computed: {
    ...mapState({
      accounts: (state: any) => state.wallet.accounts,
      currentAcc: (state: any) => state.wallet.currentAcc,
      currentCoin: (state: any) => state.wallet.currentCoin,
      currentNet: (state: any) => state.wallet.currentNet
    })
  },
  methods: {
    handleCardChange(active: number, last: number) {
      this.activeCardIndex = active;
      const acc = this.accounts[this.activeCardIndex];
      this.$store.commit("wallet/setCurrentAcc", acc);
    }
  }
});
</script>

<style lang="postcss" scoped>
.cards {
  &-card {
    width: 100%;
    height: 100%;
    background: #fff;
    opacity: 0.1;
    transition: opacity 0.5s;
  }
}

.selected {
  opacity: 1;
}
</style>
