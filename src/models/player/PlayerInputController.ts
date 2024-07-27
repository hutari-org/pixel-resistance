export default class PlayerInputController {
  private static instance: PlayerInputController;
  private inputMap: { [key: string]: boolean } = {};

  private constructor() {
    window.addEventListener("keydown", this.keyDownEvent);
    window.addEventListener("keyup", this.keyUpEvent);
  }

  private keyDownEvent(evt: KeyboardEvent) {
    PlayerInputController.instance.inputMap[evt.key] = true;
  }

  private keyUpEvent(evt: KeyboardEvent) {
    PlayerInputController.instance.inputMap[evt.key] = false;
  }

  public getInputMap() {
    return this.inputMap;
  }

  public static getInstance() {
    if (!this.instance) this.instance = new PlayerInputController();
    return this.instance;
  }
}
