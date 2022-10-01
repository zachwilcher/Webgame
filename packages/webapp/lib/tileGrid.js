import { Container } from '@pixi/display';
import {TILE_SIZE} from "./tile.js";

export class TileGrid extends Container {

    constructor() {
        super();
    }

    get tileWidth() {
        return TILE_SIZE;
    }

    get tileHeight() {
        return TILE_SIZE;
    }

    /**
     * @param x {number} local x
     * @param y {number} local y
     * @returns {Sprite} tile
     */
    getTile({x, y}) {
        const nX = Math.floor(x / this.tileWidth) * this.tileWidth;
        const nY = Math.floor(y / this.tileHeight) * this.tileHeight;
        return this.children.find((tile) => ((tile.x === nX) && (tile.y === nY)));
    }

    /**
     * @param x {number} local x
     * @param y {number} local y
     * @param tile {Sprite}
     */
    setTile({x, y}, tile) {
        const nX = Math.floor(x / this.tileWidth) * this.tileWidth;
        const nY = Math.floor(y / this.tileHeight) * this.tileHeight;
        tile.x = nX;
        tile.y = nY;
        this.addChild(tile);
    }


}
