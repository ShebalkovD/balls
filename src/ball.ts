import { CANVAS, CTX } from './main.ts';
import { CONFIG } from './config.ts';

export class Ball {
  public speed: number;
  public shift_x: number;
  public shift_y: number;

  constructor(
    public x: number,
    public y: number,
    public width: number,
    public height: number,
    public color: string,
    public isControlled?: boolean,
  ) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.isControlled = isControlled;
    this.speed = CONFIG.DEFAULT_SPEED;
    this.shift_x = 0;
    this.shift_y = 0;

    if (isControlled) {
      this.bindControlKeys();
    }
  }

  bindControlKeys(): void {
    CANVAS.addEventListener('mousemove', (event) => {
      const { offsetX, offsetY } = event;
      const dx = offsetX - (this.x + this.width / 2);
      const dy = offsetY - (this.y + this.height / 2);
      const distance = Math.sqrt(dx * dx + dy * dy);
      console.log(distance);
      if (distance > this.width / 2) {
        this.shift_x = (dx / distance) * this.speed;
        this.shift_y = (dy / distance) * this.speed;
      } else {
        this.shift_x = 0;
        this.shift_y = 0;
      }
    });
  }

  stroke(): void {
    CTX.strokeStyle = CONFIG.STROKE_COLOR;
    CTX.strokeRect(this.x, this.y, this.width, this.height);
  }

  fill(): void {
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

  draw(): void {
    this.move();
    this.stroke();
    this.fill();
  }

  move(): void {
    this.x += this.shift_x;
    this.y += this.shift_y;
  }
}
