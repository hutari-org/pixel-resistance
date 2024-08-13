import { IMapConst, IPosition } from "src/types/object.interface";
import { loadImage } from "../util/common";
import { createEvent } from "../util/event";

export default class BaseMap {
  /**
   * 캐시된 타일 이미지 객체.
   * @type {Object.<string, HTMLImageElement>}
   */
  public cachedTile: { [key: string]: HTMLImageElement } = {};

  /**
   * 모든 타일이 로드된 후에 resolve되는 프로미스.
   * @type {Promise<void>}
   */
  protected allTilesLoaded: Promise<void>;

  private _loadedImgCount: number = 0;
  private _resolveLoad: (() => void) | null = null;

  /**
   * BaseMap 클래스의 생성자
   * 이 클래스에서는 맵을 로딩할 때 까지, 그리는 걸 멈추는 로직을 구현중 (추가 기능 있으면 주석 더 추가)
   *
   * @param {CanvasRenderingContext2D} ctx - 캔버스 렌더링 컨텍스트.
   * @param {HTMLCanvasElement} canvas - HTML 캔버스 요소.
   * @param {IPosition} position - 객체의 초기 위치를 정의하는 인터페이스.
   * @param {IMapConst} MapConst - 맵 설정을 정의하는 상수 인터페이스.
   */
  constructor(
    protected ctx: CanvasRenderingContext2D,
    protected canvas: HTMLCanvasElement,
    protected position: IPosition,
    public MapConst: IMapConst
  ) {
    this.allTilesLoaded = new Promise((resolve) => {
      this._resolveLoad = resolve;
    });

    MapConst.TILES.forEach((src) => {
      const eventKey = this.constructor.name + "_tiles_" + src;
      const e = createEvent(eventKey);
      this.cachedTile[src] = loadImage(src, e);

      window.addEventListener(eventKey, this._tileLoadEventHandler.bind(this));
    });
  }

  public getMapInfo() {
    return {
      map: this,
      startX: this.position.x,
      startY: this.position.y,
      endX: this.position.x + 1920,
      endY: this.position.y + 1080,
    };
  }

  /**
   * 타일 이미지 로드 이벤트 핸들러
   * 이미지가 전부 로드 됐으면 resolve해준다.
   * @private
   */
  private _tileLoadEventHandler() {
    this._loadedImgCount = this._loadedImgCount + 1;

    if (this._loadedImgCount === this.MapConst.TILES.length) {
      if (this._resolveLoad) {
        this._resolveLoad();
        this._resolveLoad = null;
      }
      this.MapConst.TILES.forEach((src) => {
        window.removeEventListener(
          this.constructor.name + "_tiles_" + src,
          this._tileLoadEventHandler
        );
      });
    }
  }
}
