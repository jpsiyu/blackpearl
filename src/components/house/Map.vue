<template>
  <div></div>
</template>

<script lang="ts">
import Vue from "vue";
import { ICanvasElem } from "@/scripts/house/interfaces";
import { LandPos } from "@/scripts/house/drawing/landPos";
import * as drawUtil from "@/scripts/house/drawing/drawUtil";
import { IPos, IGridPos } from "@/scripts/house/interfaces";
import { MacroMap } from "@/scripts/house/macro";
import { DrawLand } from "@/scripts/house/drawing/drawLand";

interface IData {
  landPos: LandPos;
  land: DrawLand;
  draging: boolean;
  clickFlag: boolean;
  selectedGrid: IGridPos | null;
}

export default Vue.extend({
  props: { canvasElem: { type: Object as () => ICanvasElem } },
  data(): IData {
    return {
      landPos: new LandPos(0, 0),
      land: new DrawLand(),
      draging: false,
      clickFlag: false,
      selectedGrid: null
    };
  },

  mounted() {
    this.draw();
    this.canvasElem.canvas.addEventListener("mousedown", this.onMouseDown);
    this.canvasElem.canvas.addEventListener("mousemove", this.onMouseMove);
    this.canvasElem.canvas.addEventListener("mouseup", this.onMouseUp);
    this.canvasElem.canvas.addEventListener("mouseout", this.onMouseUp);
    window.addEventListener("keydown", this.onKeyDown);
  },

  methods: {
    draw() {
      this.clear();
      this.drawLand();
      this.drawSelectedGrid();
      this.drawHouse();
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
    },

    drawSelectedGrid() {
      if (!this.selectedGrid) return;

      const callback = (ctx: CanvasRenderingContext2D, pos: IPos) => {
        if (!this.selectedGrid) return;
        const rectPos = {
          x: this.selectedGrid.c * MacroMap.HouseSize,
          y: this.selectedGrid.r * MacroMap.HouseSize
        };
        ctx.fillStyle = "rgba(188,213,103, 0.5)";
        ctx.rect(rectPos.x, rectPos.y, MacroMap.HouseSize, MacroMap.HouseSize);
        ctx.fill();
      };

      const pos = this.landPos.getPos();
      drawUtil.drawWrapper(this.canvasElem.context, pos, callback);
    },

    drawHouse() {
      const callback = (ctx: CanvasRenderingContext2D, pos: IPos) => {
        const midPos = LandPos.gridMiddleInLandPos(0, 0);
        const houseImage = this.$app.house.imageMgr.getImage("house1.png");
        const size = MacroMap.HouseImageSize;
        drawUtil.drawImageMid(
          this.canvasElem.context,
          midPos,
          houseImage.obj,
          size
        );
      };
      const pos = this.landPos.getPos();
      drawUtil.drawWrapper(this.canvasElem.context, pos, callback);
    },

    onClick(event: any) {
      const canvasPos = { x: event.offsetX, y: event.offsetY };
      const mapPos = this.landPos.canvasPos2LandPos(canvasPos);
      const gridPos = this.landPos.landPosInGrid(mapPos);
      if (
        gridPos.r < 0 ||
        gridPos.r >= MacroMap.RowNum ||
        gridPos.c < 0 ||
        gridPos.c >= MacroMap.ColNum
      )
        this.selectedGrid = null;
      else this.selectedGrid = gridPos;
      this.draw();
    },

    onMouseDown(event: any) {
      const startX = event.clientX;
      const startY = event.clientY;
      this.draging = true;
      this.clickFlag = true;
      this.landPos.setStart(startX, startY);
    },

    onMouseUp(event: any) {
      this.draging = false;
      if (this.clickFlag) this.onClick(event);
    },

    onMouseMove(event: any) {
      this.clickFlag = false;
      if (!this.draging) return;

      const targetX = event.clientX;
      const targetY = event.clientY;
      this.landPos.setTarget(targetX, targetY);
      this.landPos.move();

      this.draw();
      this.landPos.setStart(targetX, targetY);
    },

    onKeyDown(event: any) {
      const offset = 10;
      switch (event.key) {
        case "d":
          this.landPos.directMove({ x: offset, y: 0 });
          this.draw();
          break;
        case "a":
          this.landPos.directMove({ x: -offset, y: 0 });
          this.draw();
          break;
        case "w":
          this.landPos.directMove({ x: 0, y: -offset });
          this.draw();
          break;
        case "s":
          this.landPos.directMove({ x: 0, y: offset });
          this.draw();
          break;
      }
    }
  }
});
</script>
