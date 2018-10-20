import * as PIXI from 'pixi.js';

export function setupCanvas(app): void {
    const renderer = app.renderer;

    PIXI.SCALE_MODES.DEFAULT = PIXI.SCALE_MODES.NEAREST;    // SUPER IMPORTANT: keeps scaled up sprites from blurring

    renderer.view.style.position = "absolute";
    renderer.view.style.display = "block";
    renderer.autoResize = true;
    renderer.resize(window.innerWidth, window.innerHeight);

    document.body.appendChild(app.view);
}