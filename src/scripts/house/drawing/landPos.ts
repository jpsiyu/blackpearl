import { MacroMap } from "@/scripts/house/macro";
import { IPos } from "@/scripts/house/interfaces";

export class LandPos {
  private posX: number;
  private posY: number;
  private startX: number;
  private startY: number;
  private targetX: number;
  private targetY: number;
  private movedX: number;
  private movedY: number;

  constructor(x: number, y: number) {
    this.posX = x;
    this.posY = y;

    this.startX = 0;
    this.startY = 0;

    this.targetX = 0;
    this.targetY = 0;

    this.movedX = 0;
    this.movedY = 0;
  }

  getPos(): IPos {
    return { x: this.posX, y: this.posY };
  }

  setStart(x: number, y: number) {
    this.startX = x;
    this.startY = y;
  }

  setTarget(x: number, y: number) {
    this.targetX = x;
    this.targetY = y;
  }

  move() {
    this.movedX = this.targetX - this.startX;
    this.movedY = this.targetY - this.startY;
    this.posX += this.movedX;
    this.posY += this.movedY;
  }

  getMoved(): IPos {
    return { x: this.movedX, y: this.movedY };
  }

  getCanvasMidPos(ctx: CanvasRenderingContext2D): IPos {
    return {
      x: ctx.canvas.width / 2 - this.posX,
      y: ctx.canvas.height / 2 - this.posY
    };
  }

  canvasPos2LandPos(pos: IPos): IPos {
    return {
      x: pos.x - this.posX,
      y: pos.y - this.posY
    };
  }

  setOriginPos(pos: IPos) {
    this.posX = pos.x;
    this.posY = pos.y;
  }

  landPosInGrid(pos: IPos): { r: number; c: number } {
    const r = Math.floor(pos.y / MacroMap.HouseSize);
    const c = Math.floor(pos.x / MacroMap.HouseSize);
    return { r, c };
  }

  static gridInLandPos(r: number, c: number): IPos {
    const x = c * MacroMap.HouseSize;
    const y = r * MacroMap.HouseSize;
    return { x, y };
  }

  static gridMiddleInLandPos(r: number, c: number): IPos {
    const x = c * MacroMap.HouseSize + MacroMap.HouseSize / 2;
    const y = r * MacroMap.HouseSize + MacroMap.HouseSize / 2;
    return { x, y };
  }
}
