import { IModel } from "src/types/model.interface";

export default class Play {
  static renderer: Play;
  drawQueue: { [key: string]: IModel } = {};
  updateQueue: { [key: string]: IModel } = {};

  static getInstance(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    if (!this.renderer) {
      this.renderer = new Play(ctx, canvas);
    }
    return this.renderer;
  }

  registerDrawQueue(key: string, c: IModel) {
    Play.renderer.drawQueue[key] = c;
  }

  registerUpdateQueue(key: string, c: IModel) {
    Play.renderer.updateQueue[key] = c;
  }

  draw() {
    Play.renderer.ctx.clearRect(
      0,
      0,
      Play.renderer.canvas.width,
      Play.renderer.canvas.height
    );

    Object.keys(Play.renderer.updateQueue).forEach((v, i) => {
      Play.renderer.updateQueue[v].update();
    });

    Object.keys(Play.renderer.drawQueue).forEach((v, i) => {
      Play.renderer.drawQueue[v].draw();
    });

    window.requestAnimationFrame(Play.renderer.draw);
  }

  private constructor(
    private ctx: CanvasRenderingContext2D,
    private canvas: HTMLCanvasElement
  ) {}
}
