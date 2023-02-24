import BlockProps from "../../Types/PropsTypes/BlockProps";
import GameObject from "./GameObject";
import getRandomNumber from "../Functions/RandomFunc";

export interface UnitInfo {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  x: number;
  y: number;
  unitSize: number;
  id: number;
  color: string;
}

export default class Block extends GameObject {
  private readonly id: number;
  private x: number;
  private y: number;
  private readonly unitSize: number;
  private color: string;

  constructor(blockProps: BlockProps) {
    super("app");

    this.id = blockProps.idNumber;

    this.x = blockProps.position?.x ?? this.getCanvas().canvas.width / 2;
    this.y = blockProps.position?.y ?? this.getCanvas().canvas.height / 2;
    this.unitSize = blockProps.size ?? 10;

    this.color =
      blockProps.color ??
      `rgba( ${getRandomNumber(200)}, ${getRandomNumber(
        200
      )}, ${getRandomNumber(200)}, 1)`;
  }

  public render2(): void {
    const ctx = this.getCtx().ctx;
    if (!ctx || !this.x || !this.y || !this.unitSize) {
      return;
    }
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.unitSize, this.unitSize);
  }

  public render(image: HTMLImageElement): void {
    const ctx = this.getCtx().ctx;
    if (!ctx || !this.x || !this.y || !this.unitSize) {
      return;
    }
    ctx.fillStyle = this.color;
    // ctx.fillRect(this.x, this.y, this.unitSize, this.unitSize);
    ctx.drawImage(
      image, // image
      0, // position of starting cut
      0,
      16, // cut in x, y
      16,
      this.x, // position of unit
      this.y,
      this.unitSize * 2, // size of unit
      this.unitSize * 2
    );
  }

  public setColor(color: string) {
    this.color = color;
    return;
  }

  public getClear(): void {
    const ctx = this.getCtx().ctx;
    if (!ctx) {
      return;
    }
    ctx.clearRect(this.x, this.y, this.unitSize, this.unitSize);
  }

  public getUnitInfo(): UnitInfo {
    const canvas = this.getCanvas().canvas;
    const ctx = this.getCtx().ctx;
    return {
      canvas,
      ctx: ctx!,
      x: this.x,
      y: this.y,
      unitSize: this.unitSize,
      id: this.id,
      color: this.color,
    };
  }

  public setXY(xFrom?: number, yFrom?: number): void {
    if (xFrom) {
      this.x = xFrom;
    }
    if (yFrom) {
      this.y = yFrom;
    }
  }
}
