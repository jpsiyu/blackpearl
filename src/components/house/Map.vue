<template>
  <div></div>
</template>

<script lang="ts">
import Vue from "vue";
import { ICanvasElem } from "@/scripts/house/interfaces";

export default Vue.extend({
  props: { canvasElem: { type: Object as () => ICanvasElem } },
  methods: {
    created() {},

    draw() {
      this.clear();
    },

    clear() {
      this.canvasElem.context.clearRect(
        0,
        0,
        this.canvasElem.width,
        this.canvasElem.height
      );
    },

    drawLand() {}
  }
});
</script>
