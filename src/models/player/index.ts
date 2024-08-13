import { IModel } from "src/types/model.interface";
import { loadImage } from "../../util/common";
import PlayerInputController from "./PlayerInputController";
import BaseMap from "../../core/BaseMap";
import { IPosition } from "src/types/object.interface";

class Player implements IModel {
  private model: any;
  private speed: number = 5;

  position: { x: number; y: number };
  inputController: PlayerInputController;

  constructor(
    private ctx: CanvasRenderingContext2D,
    private canvas: HTMLCanvasElement,
    public zIndex: number,
    private mapArr: Array<BaseMap>
  ) {
    this.position = { x: this.canvas.width / 2, y: this.canvas.height / 2 };
    this.inputController = PlayerInputController.getInstance();
    this.model = loadImage("src/assets/images/player.png");
  }

  draw() {
    this.ctx.fillStyle = "red";
    this.ctx.fillRect(0, 0, 64, 64);

    this.ctx.drawImage(this.model, this.position.x, this.position.y, 64, 64);
  }

  update() {
    const inputMap = this.inputController.getInputMap();
    const moveCoord = { x: 0, y: 0 };
    let newCoord = { x: this.position.x, y: this.position.y };

    if (inputMap["ArrowUp"]) {
      newCoord.y -= this.speed;
      moveCoord.y += this.speed;
    }

    if (inputMap["ArrowDown"]) {
      newCoord.y += this.speed;
      moveCoord.y -= this.speed;
    }

    if (inputMap["ArrowLeft"]) {
      newCoord.x -= this.speed;
      moveCoord.x += this.speed;
    }

    if (inputMap["ArrowRight"]) {
      newCoord.x += this.speed;
      moveCoord.x -= this.speed;
    }
    const map = this.detectMap(newCoord);
    if (!this.detectColision(map, newCoord)) {
      this.position = newCoord;
      this.ctx.translate(moveCoord.x, moveCoord.y);
    }
  }

  detectMap(position: IPosition): null | BaseMap {
    let currentMap: null | BaseMap = null;
    this.mapArr.forEach((m) => {
      if (currentMap) {
        return;
      }
      const { map, startX, startY, endX, endY } = m.getMapInfo();
      if (
        startX <= position.x &&
        startY <= position.y &&
        endX >= position.x + 64 &&
        endY >= position.y + 64
      ) {
        currentMap = map;
      }
    });
    return currentMap;
  }

  detectColision(map: null | BaseMap, position: IPosition): Boolean {
    if (!map) return true;
    let detected = false;
    map.MapConst.COLISIONMAP.forEach((v, i) => {
      if (v != 0) {
        const x = 64 * (i % 30);
        const y = 64 * Math.floor(i / 30);
        if (
          position.x >= x &&
          position.y >= y &&
          position.x <= x + 64 &&
          position.y <= y + 64
        ) {
          detected = true;
        }
      }
    });
    return detected;
  }
}

export default Player;
