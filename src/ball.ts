import { CANVAS, CTX } from './main.ts';
import { CONFIG } from './config.ts';

export class Ball {
  public speed: number;
  public shiftX: number;
  public shiftY: number;
  public cursorX: number;
  public cursorY: number;

  public lineWidth: number;

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
    this.shiftX = 0;
    this.shiftY = 0;
    this.cursorX = 0;
    this.cursorY = 0;

    this.lineWidth = 1;

    if (isControlled) {
      this.bindControlKeys();
    }
  }

  bindControlKeys(): void {
    CANVAS.addEventListener('mousemove', (event) => {
      const { offsetX, offsetY } = event;

      this.cursorX = offsetX;
      this.cursorY = offsetY;

      const dx = offsetX - (this.x + this.width / 2);
      const dy = offsetY - (this.y + this.height / 2);
      const distance = Math.sqrt(dx * dx + dy * dy);
      const deadZone = this.width / 5;

      if (distance > deadZone) {
        const newPosition = {
          x: (dx / distance) * this.speed,
          y: (dy / distance) * this.speed,
        };

        this.shiftX = newPosition.x;
        this.shiftY = newPosition.y;
      } else {
        this.shiftX = 0;
        this.shiftY = 0;
      }
    });
    CANVAS.addEventListener('mouseleave', () => {
      this.shiftX = 0;
      this.shiftY = 0;
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
    this.clear();
    this.move();
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

  move(): void {
    // Ограничение движения по границам canvas
    if (this.x <= 0 && this.shiftX < 0) this.shiftX = 0;
    if (this.x >= CANVAS.width - this.width && this.shiftX > 0) this.shiftX = 0;
    if (this.y <= 0 && this.shiftY < 0) this.shiftY = 0;
    if (this.y >= CANVAS.height - this.height && this.shiftY > 0)
      this.shiftY = 0;

    // Остановка при достижении курсора
    const center = { x: this.x + this.width / 2, y: this.y + this.height / 2 };
    const centerDeadZone = 5;

    if (
      this.cursorX >= center.x - centerDeadZone &&
      this.cursorX <= center.x + centerDeadZone
    )
      this.shiftX = 0;

    if (
      this.cursorY >= center.y - centerDeadZone &&
      this.cursorY <= center.y + centerDeadZone
    )
      this.shiftY = 0;

    // Шаг
    this.x += this.shiftX;
    this.y += this.shiftY;
  }
}
