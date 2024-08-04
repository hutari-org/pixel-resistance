import PlayScreen from "./screens/Play";
import Player from "./models/player";
import TestMap from "./models/maps";

const canvas: HTMLCanvasElement = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

canvas.width = 1920;
canvas.height = 1080;

const playScreen = PlayScreen.getInstance(ctx, canvas);
const player = new Player(ctx, canvas, 100);

playScreen.registerUpdateQueue("player", player);
playScreen.registerDrawQueue("player", player);

const map = new TestMap(ctx, canvas, 0, { x: 0, y: 0 });

playScreen.registerDrawQueue("map", map);

window.requestAnimationFrame(playScreen.draw);
