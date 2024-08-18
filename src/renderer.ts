import PlayScreen from "./screens/Play";
import Player from "./models/player";

const canvas: HTMLCanvasElement = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

canvas.width = 1920;
canvas.height = 1080;

const playScreen = PlayScreen.getInstance(ctx, canvas);
const player = new Player(ctx, canvas);

playScreen.registerUpdateQueue("player", player);
playScreen.registerDrawQueue("player", player);

window.requestAnimationFrame(playScreen.draw);
