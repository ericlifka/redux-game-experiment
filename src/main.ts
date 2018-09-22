import * as PIXI from 'pixi.js';
import RunLoop from "./run-loop";

const {
    Application,
    loader,
    Sprite
} = PIXI;

const app = new Application({
    // width: 256, height: 256
    // resolution: 1
});
const {
    renderer,
    stage
} = app;

PIXI.SCALE_MODES.DEFAULT = PIXI.SCALE_MODES.NEAREST;    // SUPER IMPORTANT: keeps scaled up sprites from blurring

renderer.view.style.position = "absolute";
renderer.view.style.display = "block";
renderer.autoResize = true;
renderer.resize(window.innerWidth, window.innerHeight);

document.body.appendChild(app.view);

loader.add([
    "sprites/sword-girl-front.png"
])
.load(setup);

function setup() {
    let sprite = new Sprite.fromImage("sprites/sword-girl-front.png");

    stage.addChild(sprite);

    sprite.scale.set(10, 10);
    // sprite.position.set(100, 50);
}

const runLoop = new RunLoop(function (deltaT) {
    console.log("frame", deltaT);
});

runLoop.start();