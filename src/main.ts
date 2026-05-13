import './style.css';
import { CONFIG } from './config.ts';
import { Player } from './player.ts';
import type { Ball } from './ball.ts';
import { Enemy } from './enemy.ts';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
<canvas id="canvas" width="${CONFIG.CANVAS_WIDTH}" height="${CONFIG.CANVAS_HEIGHT}"></canvas>
`;

export const CANVAS = document.getElementById('canvas') as HTMLCanvasElement;
export const CTX = CANVAS.getContext('2d') as CanvasRenderingContext2D;
export const BALLS: Array<Ball> = [];

const player = new Player(
  CONFIG.CANVAS_WIDTH / 2 - 50,
  CONFIG.CANVAS_HEIGHT / 2 - 50,
  100,
  100,
  'white',
);

const enemy = new Enemy(
  CONFIG.CANVAS_WIDTH / 2 + 100,
  CONFIG.CANVAS_HEIGHT / 2 + 100,
  60,
  60,
  'orange',
);

enemy.initRandomDirection();

setInterval(() => {
  player.clear();
  player.move();
  player.draw();

  enemy.clear();
  enemy.move();
  enemy.draw();
}, CONFIG.FRAME_TIME);
