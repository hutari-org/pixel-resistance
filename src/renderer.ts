import PlayScreen from "./screens/Play";
import MapScreen from "./screens/Map";
import Player from "./models/player";
import TestMap from "./models/maps";

const canvas: HTMLCanvasElement = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

const mapCanvas: HTMLCanvasElement = document.querySelector("#mapCanvas");
const mapCtx = mapCanvas.getContext("2d");

canvas.width = 1920;
canvas.height = 1080;

mapCanvas.width = 1920;
mapCanvas.height = 1080;

const playScreen = PlayScreen.getInstance(ctx, canvas);
const player = new Player(ctx, canvas);

const mapScreen = MapScreen.getInstance(mapCtx, mapCanvas);

playScreen.registerUpdateQueue("player", player);
playScreen.registerDrawQueue("player", player);

const map = new TestMap(mapCtx, mapCanvas, { x: 0, y: 0 });
mapScreen.registerDrawQueue("testMap", map);

mapScreen.drawOnce();

window.requestAnimationFrame(playScreen.draw);
