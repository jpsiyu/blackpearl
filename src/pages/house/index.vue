<template>
  <div class="house">
    <canvas
      ref="canvas"
      class="house-canvas"
      :width="width"
      :height="height"
    ></canvas>
    <template v-if="canvasElem">
      <Map :canvasElem="canvasElem" />
    </template>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { ICanvasElem } from "@/scripts/house/interfaces";
import Map from "@/components/house/Map.vue";
import { MacroMap } from "@/scripts/house/macro";

interface IData {
  width: number;
  height: number;
  canvasElem: ICanvasElem | null;
}

export default Vue.extend({
  components: { Map },
  data(): IData {
    return {
      width: MacroMap.CanvasWidth,
      height: MacroMap.CanvasHeight,
      canvasElem: null
    };
  },
  mounted() {
    const canvas = this.$refs.canvas as HTMLCanvasElement;
    const context = canvas.getContext("2d");
    if (!context) return;

    this.canvasElem = {
      width: MacroMap.CanvasWidth,
      height: MacroMap.CanvasHeight,
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
  cursor: pointer;
  &-canvas {
    margin: 20px 0;
    background-image: url("/house/grassland.png");
  }
}
</style>
