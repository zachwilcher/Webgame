import {Game, GAME_MODES} from "./lib/game.js";

const gameContainer = document.body.querySelector('.game-container');

const canvas = document.body.querySelector('#game-canvas');
const game = new Game({
    view: canvas,
    resizeTo: canvas,
    backgroundColor: 0x1177bb,
    storage: window.localStorage
});

const fullscreenButton = document.body.querySelector('#fullscreen');
fullscreenButton.addEventListener('click', () => {
    gameContainer.requestFullscreen().then(() => {
        game.resize();
    });
});

const flyButton = document.body.querySelector('#fly');
flyButton.addEventListener('click', () => {
    game.setMode(GAME_MODES.FLY);
});

const buildButton = document.body.querySelector('#build');
buildButton.addEventListener('click', () => {
   game.setMode(GAME_MODES.BUILD);
});

const clearButton = document.body.querySelector('#clear');
clearButton.addEventListener('click', () => {
    game.clear();
});

const saveButton = document.body.querySelector('#save');
saveButton.addEventListener('click', () => {
    game.saveBuilding();
});

const loadButton = document.querySelector('#load');
loadButton.addEventListener('click', () => {
   game.loadBuilding();
});