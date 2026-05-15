import { BALLS, CTX } from './main.ts';
import { CONFIG } from './config.ts';

export class Ball {
  public id: number;
  public speed: number;
  public shiftX: number;
  public shiftY: number;

  public lineWidth: number;

  constructor(
    public x: number,
    public y: number,
    public width: number,
    public height: number,
    public color: string,
  ) {
    this.id = BALLS.length + 1;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.speed = CONFIG.DEFAULT_SPEED;
    this.shiftX = 0;
    this.shiftY = 0;

    this.lineWidth = 1;
    BALLS.push(this);
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
    this.stroke();
    this.fill();
  }

  clear(): void {
    const lw = this.lineWidth;
    CTX.clearRect(
      this.x - lw,
      this.y - lw,
      this.width + lw * 2,
      this.height + lw * 2,
    );
  }

  step() {
    // Ограничение движения по границам canvas
    if (this.x <= 0 && this.shiftX < 0) this.shiftX = 0;
    if (this.x >= CONFIG.CANVAS_WIDTH - this.width && this.shiftX > 0)
      this.shiftX = 0;
    if (this.y <= 0 && this.shiftY < 0) this.shiftY = 0;
    if (this.y >= CONFIG.CANVAS_HEIGHT - this.height && this.shiftY > 0)
      this.shiftY = 0;

    this.x += this.shiftX;
    this.y += this.shiftY;
  }
}
