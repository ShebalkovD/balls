import { Ball } from './ball.ts';
import { CANVAS } from './main.ts';
import { getRandomInt } from './utils/getRandomInt.ts';

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
    const maxX = CANVAS.width;
    const minY = 0;
    const maxY = CANVAS.height;

    this.dx = getRandomInt(minX, maxX);
    this.dy = getRandomInt(minY, maxY);
  }

  initRandomDirection() {
    setInterval(() => {
      this.setRandomDirection();
    }, 1000);
  }

  move() {
    const distance = Math.sqrt(this.dx * this.dx + this.dy * this.dy);

    const newPosition = {
      x: (this.dx / distance) * this.speed,
      y: (this.dy / distance) * this.speed,
    };

    this.shiftX = newPosition.x;
    this.shiftY = newPosition.y;

    this.step();
  }
}
