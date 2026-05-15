import { Ball } from './ball.ts';
import { getRandomInt } from './utils/getRandomInt.ts';
import { CONFIG } from './config.ts';
import { BALLS } from './main.ts';

export class Enemy extends Ball {
  public dx: number;
  public dy: number;
  private randomMoveIntervalId: number | null;

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
    this.randomMoveIntervalId = null;
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
    this.randomMoveIntervalId = setInterval(() => {
      this.setRandomDirection();
    }, delay);
  }

  collideFindArea(ball: Ball) {
    const ballCenterX = ball.x + ball.width / 2;
    const ballCenterY = ball.y + ball.height / 2;
    return (
      ballCenterX >= this.x - CONFIG.FIND_DISTANCE + this.width / 2 &&
      ballCenterX <= this.x + CONFIG.FIND_DISTANCE + this.width / 2 &&
      ballCenterY >= this.y - CONFIG.FIND_DISTANCE + this.height / 2 &&
      ballCenterY <= this.y + CONFIG.FIND_DISTANCE + this.height / 2
    );
  }

  getVector(x: number, y: number) {
    const vector = {
      x: 0,
      y: 0,
    };

    vector.x = x - (this.x + this.width / 2);
    vector.y = y - (this.y + this.height / 2);

    return vector;
  }

  findNearestBall(): Ball | null {
    const ballInFindDistance = BALLS.filter(
      (ball) => ball.id !== this.id && this.collideFindArea(ball),
    );

    if (!ballInFindDistance.length) return null;

    const nearestBall =
      ballInFindDistance.sort((ball1, ball2) => {
        const distance1 = this.getDistance(ball1);
        const distance2 = this.getDistance(ball2);

        return distance1 - distance2;
      })[0] ?? null;

    return nearestBall;
  }

  getDistance(ball: Ball): number {
    const centerX = ball.x + ball.width / 2;
    const centerY = ball.y + ball.height / 2;
    const vector = this.getVector(centerX, centerY);
    const distance = Math.sqrt(vector.x * vector.x + vector.y * vector.y);

    return distance;
  }

  moveFrom(ball: Ball) {
    const centerX = ball.x + ball.width / 2;
    const centerY = ball.y + ball.height / 2;
    const vector = this.getVector(centerX, centerY);

    const distance = Math.sqrt(vector.x * vector.x + vector.y * vector.y);

    if (distance > 0) {
      const newPosition = {
        x: (vector.x / distance) * this.speed * -1,
        y: (vector.y / distance) * this.speed * -1,
      };

      this.shiftX = newPosition.x;
      this.shiftY = newPosition.y;
    }
  }

  moveTo(ball: Ball) {
    const centerX = ball.x + ball.width / 2;
    const centerY = ball.y + ball.height / 2;
    const vector = this.getVector(centerX, centerY);

    const distance = Math.sqrt(vector.x * vector.x + vector.y * vector.y);

    if (distance > 0) {
      const newPosition = {
        x: (vector.x / distance) * this.speed,
        y: (vector.y / distance) * this.speed,
      };

      this.shiftX = newPosition.x;
      this.shiftY = newPosition.y;
    }
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

    const nearestBall = this.findNearestBall();
    if (nearestBall) {
      if (this.randomMoveIntervalId) {
        clearInterval(this.randomMoveIntervalId);
        this.randomMoveIntervalId = null;
      }

      if (nearestBall.width > this.width) {
        this.strokeColor = 'blue';
        this.moveFrom(nearestBall);
      }
      if (nearestBall.width < this.width) {
        this.strokeColor = 'red';
        this.moveTo(nearestBall);
      }
    } else {
      if (!this.randomMoveIntervalId) {
        this.initRandomDirection();
      }
      this.strokeColor = CONFIG.STROKE_COLOR;
    }

    this.step();
  }
}
