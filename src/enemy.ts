import { Ball } from './ball.ts';

export class Enemy extends Ball {
  constructor(
    public x: number,
    public y: number,
    public width: number,
    public height: number,
    public color: string,
  ) {
    super(x, y, width, height, color);
  }
}
