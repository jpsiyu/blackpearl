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
          <div class="cards-card-acc">
            <span>账号:</span>
            <span>{{ item.name }}</span>
          </div>
          <div class="cards-card-addr" @click="switchDetail">
            <span>地址:</span>
            <span>{{ item.checksumAddress }}</span>
            <i
              class="cards-card-addr__arrow el-icon-caret-bottom"
              :class="{ rotate: showDetail }"
            ></i>
          </div>
          <div class="cards-card-addrDetail" v-show="showDetail">
            <div>
              <span>详细地址:</span>
              <span>{{ item.checksumAddress }}</span>
            </div>
            <div>
              <span></span>
              <span class="cards-card-addrDetail__copy">复制</span>
            </div>
          </div>
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
  showDetail: boolean;
}

export default Vue.extend({
  data(): IData {
    return {
      activeCardIndex: 0,
      showDetail: false
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
    },
    switchDetail() {
      this.showDetail = !this.showDetail;
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
    &-acc,
    &-addr {
      padding: 5px;
      margin: 5px 0;
      display: flex;
      align-items: center;
      span {
        &:nth-child(2) {
          display: inline-block;
          overflow: hidden;
          text-overflow: ellipsis;
          width: 100px;
          margin-left: 5px;
        }
      }
      &__arrow {
        transition: transform 0.5s;
        transform: rotateZ(-90deg);
      }
    }
    &-addrDetail {
      padding: 5px;
      background: var(--color-base-border);
      display: flex;
      flex-direction: column;
      align-items: flex-start !important;
      & > div {
        display: flex;
        margin: 5px 0;
        span {
          display: inline-block;
          word-break: break-all;
          &:nth-child(1) {
            width: 80px;
          }
          &:nth-child(2) {
            flex: 1;
          }
        }
      }
      &__copy {
        background: var(--color-blue);
        color: #fff;
        font-size: 12px;
        padding: 3px 10px;
        border-radius: 20px;
      }
    }
  }
}
.selected {
  opacity: 1;
}

.rotate {
  transform: rotateZ(0);
}
</style>
