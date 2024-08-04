import { IModel } from "src/types/model.interface";
import MapConst from "./index.const";
import BaseMap from "../../core/BaseMap";
import { IPosition } from "src/types/object.interface";

export default class TestMap extends BaseMap implements IModel {
  cached: boolean = false;
  /**
   * TestMap 클래스의 생성자
   *
   * @param {CanvasRenderingContext2D} ctx - 캔버스 렌더링 컨텍스트.
   * @param {HTMLCanvasElement} canvas - HTML 캔버스 요소.
   * @param {IPosition} startPosition - 시작 위치를 정의하는 인터페이스.
   */
  constructor(
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    public zIndex: number,
    startPosition: IPosition
  ) {
    super(ctx, canvas, startPosition, MapConst);
  }
  update: () => void;

  /**
   * 모든 타일이 로드될 때까지 대기후 맵을 그림.
   *
   * @async
   */
  async draw() {
    !this.cached && (await this.allTilesLoaded);
    this.cached = true;
    MapConst.TILEMAP.forEach((v, i) => {
      const src = MapConst.TILES[v];
      const x = 64 * (i % 30);
      const y = 64 * Math.floor(i / 30);

      this.ctx.drawImage(this.cachedTile[src], x, y, 64, 64);
    });
  }
}
