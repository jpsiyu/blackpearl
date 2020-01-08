<template>
  <div class="house">
    <canvas
      ref="canvas"
      class="house-canvas"
      :width="width"
      :height="height"
    ></canvas>
    <template v-if="canvasElem">
      <Map />
    </template>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { ICanvasElem } from "@/scripts/house/interfaces";
import Map from "@/components/house/Map.vue";

interface IData {
  width: number;
  height: number;
  canvasElem: ICanvasElem | null;
}

export default Vue.extend({
  components: { Map },
  data(): IData {
    return {
      width: 1000,
      height: 616,
      canvasElem: null
    };
  },
  mounted() {
    const canvas = this.$refs.canvas as HTMLCanvasElement;
    const context = canvas.getContext("2d");
    if (!context) return;

    this.canvasElem = {
      width: this.width,
      height: this.height,
      canvas,
      context
    };
  }
});
</script>

<style lang="postcss" scoped>
.house {
  display: flex;
  justify-content: center;
  &-canvas {
    margin: 20px 0;
    border: 1px solid green;
  }
}
</style>
