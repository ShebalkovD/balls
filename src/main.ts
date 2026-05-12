import './style.css';
import { CONFIG } from './config.ts';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
<canvas id="canvas" width="${CONFIG.CANVAS_WIDTH}" height="${CONFIG.CANVAS_HEIGHT}"></canvas>
`;

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

ctx.fillStyle = 'white';
ctx.fillRect(10, 10, 100, 100);
