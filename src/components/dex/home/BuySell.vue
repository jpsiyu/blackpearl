<template>
  <div class="bs">
    <span class="bs-title">{{ $t("buySell.buySell") }}</span>
    <el-tabs v-model="activeName" class="bs-tabs elcustom-tabs">
      <el-tab-pane :label="$t('buySell.buyOrder')" name="buy">
        <Buy />
      </el-tab-pane>
      <el-tab-pane :label="$t('buySell.sellOrder')" name="sell">
        <Sell />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Buy from "@/components/dex/home/Buy";
import Sell from "@/components/dex/home/Sell";
export default {
  components: { Buy, Sell },
  data() {
    return {
      activeName: "buy"
    };
  }
};
</script>

<style scoped>
.bs {
  background: var(--container-bg);
  color: var(--page-text);
  flex: 1;
  font-size: 12px;
  padding-bottom: 50px;
  position: relative;
}

.bs-title {
  background-color: var(--container-top);
  color: var(--page-text-highlight);
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
  display: inline-block;
  font-size: 16px;
  position: absolute;
}

.bs-tabs {
  position: absolute;
  top: 38px;
  bottom: 0;
  overflow-y: auto;
  width: 100%;
}
</style>

<style src="@/assets/css/dex/elcustom.css" scoped />
