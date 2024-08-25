export interface IPosition {
  x: number;
  y: number;
}

export interface IMapConst {
  TILEMAP: Readonly<Array<number>>;
  COLISIONMAP: Readonly<Array<number>>;
  TILES: Array<string>;
}
