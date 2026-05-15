import './style.css';
import { CONFIG } from './config.ts';
import { Player } from './player.ts';
import { Enemy } from './enemy.ts';
import { Ball } from './ball.ts';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
<canvas id="canvas" width="${CONFIG.CANVAS_WIDTH}" height="${CONFIG.CANVAS_HEIGHT}"></canvas>
`;

export const CANVAS = document.getElementById('canvas') as HTMLCanvasElement;
export const CTX = CANVAS.getContext('2d') as CanvasRenderingContext2D;
export const BALLS: Array<Player | Enemy | Ball> = [];

// const player = new Player(
//   CONFIG.CANVAS_WIDTH / 2 - 50,
//   CONFIG.CANVAS_HEIGHT / 2 - 50,
//   100,
//   100,
//   'white',
// );

new Enemy(
  CONFIG.CANVAS_WIDTH / 2 + 100,
  CONFIG.CANVAS_HEIGHT / 2 + 100,
  20,
  20,
  'white',
);

new Enemy(
  CONFIG.CANVAS_WIDTH / 2 - 100,
  CONFIG.CANVAS_HEIGHT / 2 - 100,
  40,
  40,
  'white',
);

new Enemy(
  CONFIG.CANVAS_WIDTH / 2 - 100,
  CONFIG.CANVAS_HEIGHT / 2 - 100,
  120,
  120,
  'white',
);

BALLS.forEach((ball) => {
  if (ball instanceof Enemy) ball.initRandomDirection();
});

setInterval(() => {
  BALLS.forEach((ball) => {
    ball.clear();
    if (ball instanceof Enemy || ball instanceof Player) {
      ball.move();
    }
    ball.draw();
  });
}, CONFIG.FRAME_TIME);
