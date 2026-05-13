import { CANVAS } from './main.ts';
import { Ball } from './ball.ts';

export class Player extends Ball {
  public cursorX: number;
  public cursorY: number;

  constructor(
    public x: number,
    public y: number,
    public width: number,
    public height: number,
    public color: string,
  ) {
    super(x, y, width, height, color);
    this.cursorX = 0;
    this.cursorY = 0;

    this.bindControlKeys();
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
