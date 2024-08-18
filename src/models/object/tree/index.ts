import { IModel } from "src/types/model.interface";
import BaseModel from "../../../core/BaseModel";
import { loadImage } from "../../../util/common";

export default class Tree extends BaseModel implements IModel {
  private model: HTMLImageElement;

  HP: number = 150;

  constructor(
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    public zIndex: number,
    public key: string,
    position: { x: number; y: number }
  ) {
    super(ctx, canvas, position);
    this.model = loadImage("src/assets/images/tree.png");
  }

  draw() {
    this.ctx.drawImage(this.model, this.position.x, this.position.y, 64, 128);
  }

  update() {}

  detectAttacked() {}

  getObjectId() {
    return this.key;
  }
}
