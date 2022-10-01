import * as PIXI from 'pixi.js';
import { degrees, radians } from "./math.js";

export const TILE_SIZE = 10;


export class TileType {

    texture;

    /**
     * @param texture {PIXI.Texture}
     */
    constructor(texture) {
        this.texture = texture;
    }


    /**
     * @returns {PIXI.Sprite}
     */
    sprite() {
        const sprite = new PIXI.Sprite(this.texture);


        return sprite;
    }
}


export class TileBuilder {

    /**
     * @type {number}
     */
    tileAnchor = 0;

    /**
     * @type {boolean}
     */
    interactive = false;

    /**
     * @type {boolean}
     */
    buttonMode = false;

    /**
     * @type {TileType}
     */
    tileType = null;

    /**
     * @type {number}
     */
    tileScale = 1;

    /**
     * @type {number}
     */
    rotation = 0;

    set angle(value) {
        this.rotation = radians(value);
    }

    get angle() {
        return degrees(this.rotation);
    }

    constructor(tileType) {
        this.tileType = tileType
    }

    create() {
        const sprite = this.tileType.sprite();
        sprite.anchor.set(this.tileAnchor);
        sprite.interactive =  this.interactive;
        sprite.buttonMode = this.buttonMode;
        sprite.scale.set(this.tileScale);
        sprite.rotation = this.rotation;
        return sprite;
    }

    createAt(x, y) {
        const sprite = this.create();
        sprite.x = x;
        sprite.y = y;
        return sprite;
    }


}