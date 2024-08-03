import { IBackgroundModel } from "src/types/model.interface";

export default class Map {
  /**
   * Map 클래스의 단일 인스턴스
   * @type {Map}
   * @static
   */
  public static renderer: Map;

  /**
   * 그리기 대기열 객체
   * @type {Object.<string, IBackgroundModel>}
   */
  public drawQueue: { [key: string]: IBackgroundModel } = {};

  /**
   * Map 클래스의 인스턴스를 반환합니다. 인스턴스가 없으면 새로 생성합니다.
   *
   * @param {CanvasRenderingContext2D} ctx - 캔버스 렌더링 컨텍스트.
   * @param {HTMLCanvasElement} canvas - HTML 캔버스 요소.
   * @returns {Map} Map 클래스의 단일 인스턴스.
   * @static
   */
  static getInstance(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    if (!this.renderer) {
      this.renderer = new Map(ctx, canvas);
    }
    return this.renderer;
  }

  /**
   * 그리기 대기열에 배경 모델을 등록합니다.
   *
   * @param {string} key - 배경 모델을 식별하는 키.
   * @param {IBackgroundModel} c - 그리기 대기열에 등록할 배경 모델.
   */
  registerDrawQueue(key: string, c: IBackgroundModel) {
    Map.renderer.drawQueue[key] = c;
  }

  /**
   * 한 번만 그리기 대기열에 있는 모든 배경 모델을 그립니다.
   */
  drawOnce() {
    Object.keys(Map.renderer.drawQueue).forEach((v, i) => {
      Map.renderer.drawQueue[v].drawOnce();
    });
    Map.renderer.ctx.save();
  }

  private constructor(
    private ctx: CanvasRenderingContext2D,
    private canvas: HTMLCanvasElement
  ) {}
}
