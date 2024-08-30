import { IPosition } from "src/types/object.interface";
import { loadImage } from "../../util/common";

export default class Inventory {
  protected inventory: any[];
  protected texture: any = null;

  constructor(private ctx: CanvasRenderingContext2D, private canvas: HTMLCanvasElement) {
    this.texture = loadImage("src/assets/images/image.png");
  }

  draw(pPosition: IPosition) {
    const inventoryStartX = this.canvas.width / 8 + pPosition.x - this.canvas.width / 2;
    const inventoryStartY = this.canvas.height / 8 + pPosition.y - this.canvas.height / 2;
    const inventoryWidth = (this.canvas.width / 4) * 3;
    const inventoryHeight = (this.canvas.height / 4) * 3;
    const radius = 40;
    const panding = 40;
    this.drawFrame(
      inventoryStartX,
      inventoryStartY,
      inventoryWidth,
      inventoryHeight,
      radius,
      false
    );

    const inventoryTextStartX = inventoryStartX + inventoryWidth / 4 - 120 + panding;
    const inventoryTextStartY = inventoryStartY + panding;

    // 왼쪽 영역에 "인벤토리" 텍스트 추가
    this.ctx.font = "30px Arial";
    this.ctx.fillStyle = "#000";
    this.ctx.textAlign = "left";
    this.ctx.textBaseline = "top";
    this.ctx.fillText("INVENTORY", inventoryTextStartX, inventoryTextStartY);

    const inventoryItemStartX = inventoryStartX + panding;
    const inventoryItemStartY = inventoryTextStartY + panding + 30;
    const inventoryXSize = Math.floor(
      (inventoryStartX + inventoryWidth / 2 - inventoryItemStartX) / 140
    );
    const inventoryYSize = Math.floor(
      (inventoryItemStartY + inventoryHeight - inventoryItemStartY) / 140
    );

    for (let i = 0; i < inventoryYSize; i++) {
      for (let j = 0; j <= inventoryXSize; j++) {
        this.drawFrame(
          inventoryItemStartX + j * 140,
          inventoryItemStartY + i * 140,
          100,
          100,
          0,
          true
        );
      }
    }
  }

  drawFrame(
    x: number,
    y: number,
    width: number,
    height: number,
    radius: number,
    bool: Boolean
  ) {
    this.ctx.save();

    this.ctx.beginPath();
    this.ctx.moveTo(x + radius, y);
    this.ctx.arcTo(x + width, y, x + width, y + height, radius);
    this.ctx.arcTo(x + width, y + height, x, y + height, radius);
    this.ctx.arcTo(x, y + height, x, y, radius);
    this.ctx.arcTo(x, y, x + width, y, radius);
    this.ctx.closePath();
    this.ctx.clip();

    this.ctx.drawImage(this.texture, x, y, width, height);

    this.ctx.restore();
    if (bool) {
      this.ctx.strokeStyle = "#000";
      this.ctx.lineWidth = 4;
      this.ctx.stroke();
    }
  }

  update() {}
  zIndex: number;
}
