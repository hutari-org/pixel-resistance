import { IPosition } from "src/types/object.interface";

export default class BaseModel {
  protected position: IPosition;

  constructor(
    protected ctx: CanvasRenderingContext2D,
    protected canvas: HTMLCanvasElement,
    position: IPosition
  ) {
    this.position = this.definePosition(position.x, position.y);
  }

  private definePosition(x: number, y: number) {
    const defaultPosition = {
      x: x,
      y: y - 64,
    };
    return { x: defaultPosition.x + x, y: defaultPosition.y - y };
  }
}
