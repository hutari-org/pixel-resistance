export interface IModel {
  update: () => void;
  draw: () => void;
}

export interface IBackgroundModel {
  drawOnce: () => void;
}
