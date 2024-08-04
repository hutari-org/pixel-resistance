import { IModel } from "src/types/model.interface";
import { loadImage } from "../../util/common";
import PlayerInputController from "./PlayerInputController";
import { createEvent } from "../../util/event";

class Player implements IModel {
  private model: any;

  position: { x: number; y: number };
  inputController: PlayerInputController;

  constructor(
    private ctx: CanvasRenderingContext2D,
    private canvas: HTMLCanvasElement,
    public zIndex: number
  ) {
    this.position = { x: this.canvas.width / 2, y: this.canvas.height / 2 };
    this.inputController = PlayerInputController.getInstance();
    this.model = loadImage("src/assets/images/player.png");
  }

  draw() {
    this.ctx.drawImage(this.model, this.position.x, this.position.y);
  }

  update() {
    const inputMap = this.inputController.getInputMap();
    const moveCoord = { x: 0, y: 0 };

    if (inputMap["ArrowUp"]) {
      this.position.y -= 10;
      moveCoord.y += 10;
    }

    if (inputMap["ArrowDown"]) {
      this.position.y += 10;
      moveCoord.y -= 10;
    }

    if (inputMap["ArrowLeft"]) {
      this.position.x -= 10;
      moveCoord.x += 10;
    }

    if (inputMap["ArrowRight"]) {
      this.position.x += 10;
      moveCoord.x -= 10;
    }
    this.ctx.translate(moveCoord.x, moveCoord.y);
  }
}

export default Player;
