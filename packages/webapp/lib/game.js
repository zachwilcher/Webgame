import * as PIXI from 'pixi.js';
import TileGrid from "./tile/tileGrid.js";
import {BLANK_TILE, BORDERED_TILE, ORNATE_TILE} from "./tileTypes.js";
import {Rectangle} from "pixi.js";

export const GAME_MODES = {
    FLY: "FLY",
    BUILD: "BUILD"
};

export class Game {

    /**
     * @type {string}
     */
    mode;

    /**
     * @type {PIXI.Application}
     */
    app;


    /**
     * @type {TileGrid}
     */
    toolboxGrid;


    /**
     * @type {TileGrid}
     */
    sandboxGrid;

    /**
     * @type {TileBuilder}
     */
    sandboxBuilder;

    constructor({view, resizeTo, backgroundColor}) {

        this.app = new PIXI.Application({view, backgroundColor, resizeTo});

        // configure app stage
        this.app.stage.interactive = true;
        this.app.stage.hitArea = this.app.renderer.screen;


        this.sandboxGrid = new TileGrid(10);
        this.sandboxGrid.interactive = true;
        this.sandboxGrid.hitArea = new PIXI.Rectangle(-100, 0, this.app.renderer.width, this.app.renderer.height);
        this.sandboxGrid.x = 100;
        this.app.stage.addChild(this.sandboxGrid);

        this.sandboxBuilder = this.sandboxGrid.createBuilder();
        this.sandboxBuilder.tileType = BLANK_TILE;

        this.toolboxGrid = new TileGrid(20);
        this.app.stage.addChild(this.toolboxGrid);
        const toolboxBuilder = this.toolboxGrid.createBuilder();
        toolboxBuilder.interactive = true;
        toolboxBuilder.buttonMode = true;

        toolboxBuilder.tileType = BORDERED_TILE;
        this.toolboxGrid.createAt({x: 0, y: 50}, toolboxBuilder).addListener('pointertap', () => {
            console.log('bordered tile selected!');
            this.sandboxBuilder.tileType = BORDERED_TILE;
        });

        toolboxBuilder.tileType = BLANK_TILE;
        this.toolboxGrid.createAt({x: 0, y: 150}, toolboxBuilder).addListener('pointertap', () => {
            console.log('blank tile selected!');
            this.sandboxBuilder.tileType = BLANK_TILE;
        });

        toolboxBuilder.tileType = ORNATE_TILE;
        this.toolboxGrid.createAt({x: 0, y: 250}, toolboxBuilder).addListener('pointertap', () => {
            console.log('ornate tile selected!');
            this.sandboxBuilder.tileType = ORNATE_TILE;
        });

        const sandboxGrid = this.sandboxGrid;
        const sandboxBuilder = this.sandboxBuilder;

        sandboxGrid.addListener('pointertap', event => {
            const point = sandboxGrid.toLocal(event.data.global);
            if(!sandboxGrid.getTile(point)) {
                sandboxGrid.createAt(point, sandboxBuilder);
            }
        })



    }

    /**
     * @param mode
     */
    setMode(mode) {
        if(!GAME_MODES[mode]) {
            throw new Error(`${mode} is not a valid game mode.`);
        }
        this.mode = mode;

    }

    resize() {
        this.app.resize();
    }

    clear() {

    }

}
