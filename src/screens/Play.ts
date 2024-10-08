import { IModel } from "src/types/model.interface";

export default class Play {
  static renderer: Play;
  drawQueue: Array<{ key: string; c: IModel }> = [];
  updateQueue: Array<{ key: string; c: IModel }> = [];

  static getInstance(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    if (!this.renderer) {
      this.renderer = new Play(ctx, canvas);
    }
    return this.renderer;
  }

  registerDrawQueue(key: string, c: IModel) {
    Play.renderer.drawQueue.push({ key, c });
    Play.renderer.drawQueue.sort((a, b) => {
      return a.c.zIndex - b.c.zIndex;
    });
  }

  registerUpdateQueue(key: string, c: IModel) {
    Play.renderer.updateQueue.push({ key, c });
    Play.renderer.updateQueue.sort((a, b) => {
      return a.c.zIndex - b.c.zIndex;
    });
  }

  draw() {
    Play.renderer.ctx.clearRect(
      -Play.renderer.canvas.width,
      -Play.renderer.canvas.height,
      Play.renderer.canvas.width * 3,
      Play.renderer.canvas.height * 3
    );

    Play.renderer.drawQueue.forEach((v) => {
      v.c.draw();
    });

    Play.renderer.updateQueue.forEach((v) => {
      v.c.update();
    });

    window.requestAnimationFrame(Play.renderer.draw);
  }

  private constructor(
    private ctx: CanvasRenderingContext2D,
    private canvas: HTMLCanvasElement
  ) {}
}
