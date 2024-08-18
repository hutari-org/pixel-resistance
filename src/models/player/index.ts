import { IModel } from "src/types/model.interface";
import { loadImage } from "../../util/common";
import PlayerInputController from "./PlayerInputController";
import BaseMap from "../../core/BaseMap";
import { IPosition } from "src/types/object.interface";

class Player implements IModel {
  private model: any;
  private speed: number = 5;

  position: IPosition;
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
    this.attack(map);
    if (!this.detectColision(map, newCoord)) {
      this.position = newCoord;
      this.ctx.translate(moveCoord.x, moveCoord.y);
    }
  }

  private detectMap(position: IPosition): null | BaseMap {
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

  private detectColision(map: null | BaseMap, position: IPosition): boolean {
    if (!map) return true;
    let detected = false;
    map.MapConst.COLISIONMAP.forEach((v, i) => {
      if (v != 0) {
        const x = 64 * (i % 30);
        const y = 64 * Math.floor(i / 30);
        if (
          position.x + 32 >= x &&
          position.y + 32 >= y &&
          position.x + 32 <= x + 64 &&
          position.y + 32 <= y + 64
        ) {
          detected = true;
        }
      }
    });
    return detected;
  }

  private attack(map: null | BaseMap) {
    const inputMap = this.inputController.getInputMap();

    if (inputMap["click"]) {
      const mousePosition = this.inputController.getMousePosition();
      const currentMousePosition = this.convertMousePositionToCanvas(mousePosition);
      const currentPosition = { x: this.position.x + 32, y: this.position.y + 32 };

      const angle = this.calculateAngle(currentPosition, currentMousePosition);

      const fanAngle = Math.PI / 6;
      const startAngle = angle * (Math.PI / 180) - fanAngle / 2;
      const endAngle = angle * (Math.PI / 180) + fanAngle / 2;

      const colisionEvent = this.detectColisionArc(map, currentPosition, {
        distance: 100,
        startAngle,
        endAngle,
      });

      colisionEvent.forEach((event: any) => {
        event(30);
      });

      // 공격 범위 시각화
      this.ctx.beginPath();
      this.ctx.moveTo(this.position.x + 32, this.position.y + 32);
      this.ctx.arc(this.position.x + 32, this.position.y + 32, 100, startAngle, endAngle);
      this.ctx.closePath();
      this.ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
      this.ctx.stroke();
    }
  }

  private detectColisionArc(
    map: null | BaseMap,
    originPos: IPosition,
    options: any
  ): Array<any> {
    if (!map) return [];
    const detectedEvent: Array<any> = [];
    map.MapConst.COLISIONMAP.forEach((v, i) => {
      if (v != 0) {
        const x = 64 * (i % 30);
        const y = 64 * Math.floor(i / 30);
        const points: Array<IPosition> = [
          { x: x, y: y },
          { x: x + 64, y: y },
          { x: x, y: y + 64 },
          { x: x + 64, y: y + 64 },
        ];

        const isDetected = points.some((point) =>
          this.isPointInArc(
            originPos,
            point,
            options.distance,
            options.startAngle,
            options.endAngle
          )
        );

        if (isDetected) {
          const obj = map.cachedObj[i];
          detectedEvent.push(obj.triggerAttackEvent.bind(obj));
        }
      }
    });

    return detectedEvent;
  }

  private convertMousePositionToCanvas(mousePosition: IPosition) {
    return {
      x:
        mousePosition.x * (1920 / window.innerWidth) +
        this.position.x -
        this.canvas.width / 2,
      y:
        mousePosition.y * (1080 / window.innerHeight) +
        this.position.y -
        this.canvas.height / 2,
    };
  }

  private calculateAngle(originPos: IPosition, destinationPos: IPosition) {
    const deltaX = destinationPos.x - originPos.x;
    const deltaY = destinationPos.y - originPos.y;

    let angleInRadians = Math.atan2(deltaY, deltaX);

    let angleInDegrees = angleInRadians * (180 / Math.PI);
    if (angleInDegrees < 0) {
      angleInDegrees += 360;
    }

    return angleInDegrees;
  }

  private calculateDistance(originPos: IPosition, destinationPos: IPosition) {
    const dx = destinationPos.x - originPos.x;
    const dy = destinationPos.y - originPos.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  private isPointInArc(
    originPos: IPosition,
    destinationPos: IPosition,
    radius: number,
    startAngle: number,
    endAngle: number
  ): boolean {
    const distanceToPoint = this.calculateDistance(originPos, destinationPos);
    if (distanceToPoint > radius) {
      return false;
    }

    const angleToPoint = this.calculateAngle(originPos, destinationPos) * (Math.PI / 180);

    if (startAngle <= endAngle) {
      return angleToPoint >= startAngle && angleToPoint <= endAngle;
    } else {
      return angleToPoint >= startAngle || angleToPoint <= endAngle;
    }
  }
}

export default Player;
