export default class GameObject {
  private readonly canvas: HTMLCanvasElement;
  private readonly ctx: CanvasRenderingContext2D;

  constructor(canvasId: string) {
    const canvasElement = document.getElementById(
      canvasId
    ) as HTMLCanvasElement;
    if (!canvasElement) {
      throw new Error(`No canvas element with id "${canvasId}" found.`);
    }

    const context = canvasElement.getContext("2d");
    if (!context) {
      throw new Error(
        `Failed to get 2D rendering context for canvas with id "${canvasId}".`
      );
    }

    this.canvas = canvasElement;
    this.ctx = context;
  }

  public clearCanvas(): void {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  public getCanvas(): { canvas: HTMLCanvasElement } {
    return { canvas: this.canvas };
  }

  public getCtx(): { ctx: CanvasRenderingContext2D } {
    return { ctx: this.ctx };
  }
}
