import { CTX } from './main.ts';
import { CONFIG } from './config.ts';

export class Ball {
  constructor(
    public x: number,
    public y: number,
    public width: number,
    public height: number,
    public color: string,
  ) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
  }

  stroke() {
    CTX.strokeStyle = CONFIG.STROKE_COLOR;
    CTX.strokeRect(this.x, this.y, this.width, this.height);
  }

  fill() {
    CTX.fillStyle = this.color;
    CTX.beginPath();
    CTX.arc(
      this.x + this.width / 2,
      this.y + this.height / 2,
      this.width / 2,
      0,
      2 * Math.PI,
    );
    CTX.fill();
    CTX.fillStyle = CONFIG.DEFAULT_FILL_COLOR;
  }

  draw() {
    this.stroke();
    this.fill();
  }
}
