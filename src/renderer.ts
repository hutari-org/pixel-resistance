/**
 * This file will automatically be loaded by vite and run in the "renderer" context.
 * To learn more about the differences between the "main" and the "renderer" context in
 * Electron, visit:
 *
 * https://electronjs.org/docs/tutorial/application-architecture#main-and-renderer-processes
 *
 * By default, Node.js integration in this file is disabled. When enabling Node.js integration
 * in a renderer process, please be aware of potential security implications. You can read
 * more about security risks here:
 *
 * https://electronjs.org/docs/tutorial/security
 *
 * To enable Node.js integration in this file, open up `main.ts` and enable the `nodeIntegration`
 * flag:
 *
 * ```
 *  // Create the browser window.
 *  mainWindow = new BrowserWindow({
 *    width: 800,
 *    height: 600,
 *    webPreferences: {
 *      nodeIntegration: true
 *    }
 *  });
 * ```
 */

const canvas : HTMLCanvasElement = document.querySelector('#canvas');
const ctx = canvas.getContext("2d");
canvas.width = 1920;
canvas.height = 1080;

// 이미지 불러오기 및 그리기
function loadImageAndDraw(src : string, width : number, height : number) {
    const img = new Image();
    img.src = src; // 이미지 경로 설정

    img.onload = () => {
        ctx.drawImage(img, 0, 0, width, height);
    };

    img.onerror = () => {
        console.error('Failed to load image');
    };
}

// 캔버스 초기화 및 이미지 그리기
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // 캔버스 초기화
    loadImageAndDraw("src/ddang.png", 64, 64); // 이미지 불러오기 및 그리기
    loadImageAndDraw("src/tree.png", 64, 128); // 이미지 불러오기 및 그리기
}

draw(); // 초기 그리기