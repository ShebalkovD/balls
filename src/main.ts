import './style.css';
import { CONFIG } from './config.ts';
import { Ball } from './ball.ts';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
<canvas id="canvas" width="${CONFIG.CANVAS_WIDTH}" height="${CONFIG.CANVAS_HEIGHT}"></canvas>
`;

export const CANVAS = document.getElementById('canvas') as HTMLCanvasElement;
export const CTX = CANVAS.getContext('2d') as CanvasRenderingContext2D;

const player = new Ball(
  CONFIG.CANVAS_WIDTH / 2 - 50,
  CONFIG.CANVAS_HEIGHT / 2 - 50,
  100,
  100,
  'white',
  true,
);
player.draw();

setInterval(() => {
  player.draw();
}, CONFIG.FRAME_TIME);
