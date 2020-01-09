import { MacroMap } from "@/scripts/house/macro";
import { IPos, IGridPos } from "@/scripts/house/interfaces";

/**
 * land 坐标系
 * canvas坐标，指相对于canvas原点的坐标，所有显示的点都是canvas的点
 * land坐标，指相对于全部土地原点的坐标，land在canvas上移动
 * grid坐标，指land上某一块土地，(1,2)表示1行2列的土地的启起点
 */
export class LandCoordinate {
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

  // setStart, setTarget, move 配合使用，实现拖拽效果
  // 鼠标点击时，setStart设置起点
  // 鼠标移动，setTarget设置目标，调用move移动land
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

  // directMove 直接移动land
  directMove(offset: IPos) {
    this.posX += offset.x;
    this.posY += offset.y;
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

  static landPos2GridPos(pos: IPos): IGridPos {
    const r = Math.floor(pos.y / MacroMap.HouseSize);
    const c = Math.floor(pos.x / MacroMap.HouseSize);
    return { r, c };
  }

  static gridPos2LandPos(r: number, c: number): IPos {
    const x = c * MacroMap.HouseSize;
    const y = r * MacroMap.HouseSize;
    return { x, y };
  }

  static gridMiddle2LandPos(r: number, c: number): IPos {
    const x = c * MacroMap.HouseSize + MacroMap.HouseSize / 2;
    const y = r * MacroMap.HouseSize + MacroMap.HouseSize / 2;
    return { x, y };
  }
}
