import './style.css';
import { CONFIG } from './config.ts';
import { Player } from './player.ts';
import { Enemy } from './enemy.ts';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
<canvas id="canvas" width="${CONFIG.CANVAS_WIDTH}" height="${CONFIG.CANVAS_HEIGHT}"></canvas>
`;

export const CANVAS = document.getElementById('canvas') as HTMLCanvasElement;
export const CTX = CANVAS.getContext('2d') as CanvasRenderingContext2D;
export const BALLS: Array<Player | Enemy> = [];

// const player = new Player(
//   CONFIG.CANVAS_WIDTH / 2 - 50,
//   CONFIG.CANVAS_HEIGHT / 2 - 50,
//   100,
//   100,
//   'white',
// );

const enemy = new Enemy(
  CONFIG.CANVAS_WIDTH / 2 + 100,
  CONFIG.CANVAS_HEIGHT / 2 + 100,
  20,
  20,
  'orange',
);

const enemy2 = new Enemy(
  CONFIG.CANVAS_WIDTH / 2 - 100,
  CONFIG.CANVAS_HEIGHT / 2 - 100,
  40,
  40,
  'green',
);

const enemy3 = new Enemy(
  CONFIG.CANVAS_WIDTH / 2 - 100,
  CONFIG.CANVAS_HEIGHT / 2 - 100,
  120,
  120,
  'blue',
);

enemy.initRandomDirection();
enemy2.initRandomDirection();
enemy3.initRandomDirection();

setInterval(() => {
  BALLS.forEach((ball) => {
    ball.clear();
    ball.move();
    ball.draw();
  });
}, CONFIG.FRAME_TIME);
