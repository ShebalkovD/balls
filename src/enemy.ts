import { Ball } from './ball.ts';
import { getRandomInt } from './utils/getRandomInt.ts';
import { CONFIG } from './config.ts';

export class Enemy extends Ball {
  public dx: number;
  public dy: number;

  constructor(
    public x: number,
    public y: number,
    public width: number,
    public height: number,
    public color: string,
  ) {
    super(x, y, width, height, color);
    this.dx = 0;
    this.dy = 0;
  }

  setRandomDirection() {
    const minX = 0;
    const maxX = CONFIG.CANVAS_WIDTH;
    const minY = 0;
    const maxY = CONFIG.CANVAS_HEIGHT;

    this.dx = getRandomInt(minX, maxX) - (this.x + this.width / 2);
    this.dy = getRandomInt(minY, maxY) - (this.y + this.height / 2);
  }

  initRandomDirection() {
    const delay = 1000 + this.width * 5;
    setInterval(() => {
      this.setRandomDirection();
    }, delay);
  }

  move() {
    const distance = Math.sqrt(this.dx * this.dx + this.dy * this.dy);

    if (distance > 0) {
      const newPosition = {
        x: (this.dx / distance) * this.speed,
        y: (this.dy / distance) * this.speed,
      };

      this.shiftX = newPosition.x;
      this.shiftY = newPosition.y;
    } else {
      this.shiftX = 0;
      this.shiftY = 0;
    }

    this.step();
  }
}
