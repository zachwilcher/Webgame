import {TileBuilder, TileType} from "./tile.js";
import {TileGrid} from "./tileGrid.js";
import { Application } from "@pixi/app";
import { Texture } from "@pixi/core";

import '@pixi/events';

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
     * @type {Application}
     */
    app;

    started = false;

    tileBuilder;

    tileGrid;

    constructor({view, resizeTo, backgroundColor}) {

        const app = new Application({view, backgroundColor, resizeTo});
        this.app = app;

        const borderedTileTexture = Texture.from('./assets/borderTile.png');
        const ornateTileTexture = Texture.from('./assets/ornateTile.png');
        const blankTileTexture = Texture.from('./assets/blankTile.png');

        const borderedTileType = new TileType(borderedTileTexture);
        const ornateTileType = new TileType(ornateTileTexture);
        const blankTileType = new TileType(blankTileTexture);

        app.stage.interactive = true;
        app.stage.hitArea = app.renderer.screen;

        this.tileBuilder = new TileBuilder(borderedTileType);
        const tileBuilder = this.tileBuilder;
        tileBuilder.tileScale = 2;
        tileBuilder.interactive = true;
        tileBuilder.buttonMode = true;

        // create tile toolbox

        let sprite;
        sprite = tileBuilder.createAt(0, 50);
        sprite.addEventListener('pointertap', event => {
            tileBuilder.tileType = borderedTileType;
        });
        app.stage.addChild(sprite);

        tileBuilder.tileType = ornateTileType;
        sprite = tileBuilder.createAt(0, 150);
        sprite.addEventListener('pointertap', event => {
            tileBuilder.tileType = ornateTileType;
        });
        app.stage.addChild(sprite);

        tileBuilder.tileType = blankTileType;
        sprite = tileBuilder.createAt(0, 250);
        sprite.addEventListener('pointertap', event => {
            tileBuilder.tileType = blankTileType;
        });
        app.stage.addChild(sprite);

        tileBuilder.tileScale = 1;


        // tileGrid is where stuff is placed you know like the sandbox itself
        this.tileGrid = new TileGrid();
        const tileGrid = this.tileGrid;

        app.stage.addChild(tileGrid);


        app.stage.addEventListener('pointertap', event => {
            console.log(event.data.global);
            const pos = tileGrid.toLocal(event.data.global);
            const tile = tileGrid.getTile(pos);
            if (!tile) {
                tileGrid.setTile(pos, tileBuilder.create());
            }
        });

        this.started = true;
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
        if(this.started) {
            this.app.resize();
        }
    }

    clear() {
        this.tileGrid.removeChildren();
    }

}
