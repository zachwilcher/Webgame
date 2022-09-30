import * as PIXI from "pixi.js";
import { TileGrid } from "./tile.js";
import { Sprite } from "pixi.js";


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

    constructor({view, resizeTo, backgroundColor}) {
        const app = new PIXI.Application({view, backgroundColor, resizeTo});
        this.app = app;
        const borderedTileTexture = PIXI.Texture.from('./assets/borderTile.png');
        const ornateTileTexture = PIXI.Texture.from('./assets/ornateTile.png');
        const blankTileTexture = PIXI.Texture.from('./assets/blankTile.png');

        app.stage.interactive = true;
        app.stage.hitArea = app.screen;



        let selectedTexture = borderedTileTexture;
        const scale = {x: 2, y: 2};

        const borderedSprite = new PIXI.Sprite(borderedTileTexture);
        borderedSprite.scale = scale;
        borderedSprite.interactive = true;
        borderedSprite.buttonMode = true;
        borderedSprite.addListener('pointertap', (event) => {
            selectedTexture = borderedTileTexture
        });
        app.stage.addChild(borderedSprite);


        const ornateSprite = new PIXI.Sprite(ornateTileTexture);
        ornateSprite.scale = scale;
        ornateSprite.y = 100;
        ornateSprite.interactive = true;
        ornateSprite.buttonMode = true;
        ornateSprite.addListener('pointertap', () => {
            console.log('ornateSprite pointertap');
            selectedTexture = ornateTileTexture;
        })
        app.stage.addChild(ornateSprite);

        const blankSprite = new PIXI.Sprite(blankTileTexture);
        blankSprite.scale = scale;
        blankSprite.y = 200;
        blankSprite.interactive = true
        blankSprite.buttonMode = true;
        blankSprite.addListener('pointertap', () => {
            selectedTexture = blankTileTexture;
        });
        app.stage.addChild(blankSprite);

        const tileGrid = new TileGrid();
        tileGrid.x = 100;
        app.stage.addChild(tileGrid);


        app.stage.addListener('pointertap', (event) => {
            console.log('app.stage pointertap');
            const pos = tileGrid.toLocal(event.data.global);
            const tile = tileGrid.getTile(pos);
            if (!tile) {
                tileGrid.setTile(pos, new Sprite(selectedTexture));
            }
            else if(tile.texture !== selectedTexture){
                tile.texture = selectedTexture;
            }
        });

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

}
