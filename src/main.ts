import * as PIXI from 'pixi.js';
import RunLoop from "./run-loop";
import { setupCanvas } from './helpers/setup-canvas';
import { attachFocusListeners } from './helpers/attach-focus-listeners';
import { SPRITE_PATHS } from './sprite-list';
import { GameState } from './helpers/game-states';
import { GameModel, newGameModel } from './game-model';

const { Application, Sprite } = PIXI;

const runLoop = new RunLoop(gameStep);
const app = new Application();
const { stage, renderer } = app;

const model: GameModel = newGameModel();

attachFocusListeners(runLoop);
setupCanvas(app);

PIXI.loader
    .add(SPRITE_PATHS)
    .load(() => runLoop.start());

function gameStep(deltaT) {
    switch (model.state) {
        case GameState.Loading: loadingStep(deltaT); break;
        case GameState.MainMenu: mainMenuStep(deltaT); break;
    }

    renderer.flush();
}

function loadingStep(deltaT) {
    console.log('loading-step');

    let sprite = new Sprite.fromImage("sprites/sword-girl-front.png");
    stage.addChild(sprite);    
    sprite.scale.set(10, 10);

    model.sprite = sprite;

    model.state = GameState.MainMenu; 
}

function mainMenuStep(deltaT) {
    console.log('main-menu-step');

    model.sprite.x += 1;
}