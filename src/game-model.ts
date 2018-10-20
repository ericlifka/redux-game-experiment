import { GameState } from "./helpers/game-states";

export interface GameModel {
    state: GameState

    sprite?: any
}

export function newGameModel() {
    return {
        state: GameState.Loading
    } as GameModel;
}
