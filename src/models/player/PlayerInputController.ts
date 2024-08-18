export default class PlayerInputController {
  private static instance: PlayerInputController;
  private inputMap: { [key: string]: boolean } = {};
  private mousePosition: { x: number; y: number } = { x: null, y: null };

  private constructor() {
    window.addEventListener("keydown", this.keyDownEvent);
    window.addEventListener("keyup", this.keyUpEvent);
    window.addEventListener("mousemove", this.mousePositionEvent);
    window.addEventListener("mousedown", this.mouseDownEvent);
    window.addEventListener("mouseup", this.mouseUpEvent);
  }

  private keyDownEvent(evt: KeyboardEvent) {
    PlayerInputController.instance.inputMap[evt.key] = true;
  }

  private keyUpEvent(evt: KeyboardEvent) {
    PlayerInputController.instance.inputMap[evt.key] = false;
  }

  private mouseDownEvent(evt: MouseEvent) {
    PlayerInputController.instance.inputMap["click"] = true;
  }

  private mouseUpEvent(evt: MouseEvent) {
    PlayerInputController.instance.inputMap["click"] = false;
  }

  private mousePositionEvent(evt: MouseEvent) {
    PlayerInputController.instance.mousePosition = { x: evt.pageX, y: evt.pageY };
  }

  public getInputMap() {
    return this.inputMap;
  }

  public getMousePosition() {
    return this.mousePosition;
  }

  public static getInstance() {
    if (!this.instance) this.instance = new PlayerInputController();
    return this.instance;
  }
}
