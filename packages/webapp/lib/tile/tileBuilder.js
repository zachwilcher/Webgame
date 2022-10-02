import {radians, degrees} from "../math.js";

export default class TileBuilder {

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
    tileSize = 10;

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

    constructor() {
    }

    create() {
        if(this.tileType) {
            const sprite = this.tileType.createSprite();
            sprite.anchor.set(this.tileAnchor);
            sprite.interactive =  this.interactive;
            sprite.buttonMode = this.buttonMode;
            sprite.width = this.tileSize;
            sprite.height = this.tileSize;
            sprite.rotation = this.rotation;
            return sprite;
        }

        throw new Error('TileType must be specified');
    }

    createAt({x, y}) {
        const sprite = this.create();
        sprite.x = x;
        sprite.y = y;
        return sprite;
    }
}
