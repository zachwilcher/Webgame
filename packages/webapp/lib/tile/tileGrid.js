import * as PIXI from 'pixi.js';
import TileBuilder from "./tileBuilder.js";

export default class TileGrid extends PIXI.Container {

    /**
     * @param size {number}
     */
    constructor(size) {
        super();
        this.size = size;
    }

    get tileWidth() {
        return this.size;
    }

    get tileHeight() {
        return this.size;
    }

    /**
     * @param point {{x: number, y: number}}
     * @returns {Tile} tile
     */
    getTile(point) {
        const {x: nX, y: nY} = this.getTileSlot(point)
        return this.children.find(tile => ((tile.x === nX) && (tile.y === nY)));
    }

    /**
     * @param point {{x: number, y: number}}
     * @param tile {Sprite}
     */
    setTile(point, tile) {
        const {x: nX, y: nY} = this.getTileSlot(point)
        tile.x = nX;
        tile.y = nY;
        this.addChild(tile);
        return tile;
    }

    getTileSlot({x, y}) {
        return {
            x: Math.floor(x / this.tileWidth) * this.tileWidth,
            y: Math.floor(y / this.tileHeight) * this.tileHeight
        };
    }

    /**
     * @returns {TileBuilder}
     */
    createBuilder() {
        const builder = new TileBuilder();
        builder.tileSize = this.size;
        return builder;
    }

    /**
     * @param point {{x: number, y: number}}
     * @param builder {TileBuilder}
     * @returns {Sprite}
     */
    createAt(point, builder) {
        return this.setTile(point, builder.create());
    }

}
