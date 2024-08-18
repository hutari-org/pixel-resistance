import { IModel } from "src/types/model.interface";
import BaseModel from "../../../core/BaseModel";
import { loadImage } from "../../../util/common";
import { createCustomEvent, createEvent } from "../../../util/event";

export default class Tree extends BaseModel implements IModel {
  private model: HTMLImageElement;

  public HP: number = 150;

  constructor(
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    public zIndex: number,
    public key: string,
    position: { x: number; y: number }
  ) {
    super(ctx, canvas, position);
    this.model = loadImage("src/assets/images/tree.png");
    window.addEventListener(this.key, this.detectAttacked.bind(this));
  }

  draw() {
    if (this.HP > 0)
      this.ctx.drawImage(this.model, this.position.x, this.position.y, 64, 128);
  }

  update() {}

  detectAttacked(event: CustomEvent) {
    this.HP = this.HP - parseInt(event.detail.power);
  }

  triggerAttackEvent(power: number) {
    const attackEvt = createCustomEvent(this.key, { power: power });
    dispatchEvent(attackEvt);
  }
}
