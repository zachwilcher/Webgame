import {Game, GAME_MODES} from "./lib/game.js";

const gameContainer = document.body.querySelector('.game-container');

const fullscreenButton = document.body.querySelector('#fullscreen');
fullscreenButton.addEventListener('click', () => {
    gameContainer.requestFullscreen();
});

const canvas = document.body.querySelector('#game-canvas');
const game = new Game({view: canvas, resizeTo: gameContainer, backgroundColor: 0x1177bb});

const flyButton = document.body.querySelector('#fly');
flyButton.addEventListener('click', () => {
    game.setMode(GAME_MODES.FLY);
});
const buildButton = document.body.querySelector('#build');
buildButton.addEventListener('click', () => {
   game.setMode(GAME_MODES.BUILD);
});

