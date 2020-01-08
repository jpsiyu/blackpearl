<template>
  <div></div>
</template>

<script lang="ts">
import Vue from "vue";
import { ICanvasElem } from "@/scripts/house/interfaces";
import { LandPos } from "@/scripts/house/drawing/landPos";
import * as drawUtil from "@/scripts/house/drawing/drawUtil";
import { IPos } from "@/scripts/house/interfaces";
import { MacroMap } from "@/scripts/house/macro";
import { DrawLand } from "@/scripts/house/drawing/drawLand";

interface IData {
  landPos: LandPos;
  land: DrawLand;
}

export default Vue.extend({
  props: { canvasElem: { type: Object as () => ICanvasElem } },
  data() {
    return {
      landPos: new LandPos(0, 0),
      land: new DrawLand()
    };
  },

  mounted() {
    this.draw();
  },

  methods: {
    draw() {
      this.clear();
      this.drawLand();
    },

    clear() {
      this.canvasElem.context.clearRect(
        0,
        0,
        this.canvasElem.width,
        this.canvasElem.height
      );
    },

    drawLand() {
      const pos = this.landPos.getPos();
      const callback = (ctx: CanvasRenderingContext2D, pos: IPos) => {
        this.land.draw(ctx, pos);
      };
      drawUtil.drawWrapper(this.canvasElem.context, pos, callback);
    }
  }
});
</script>
