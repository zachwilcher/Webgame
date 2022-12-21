import {radians, degrees} from "../math.js";

/**
 * @typedef TileBuilderOptions {Object}
 * @property alpha {number}
 * @property
 */


export default class TileBuilder {

    /**
     * @type {number}
     */
    tileAnchor;

    /**
     * @type {boolean}
     */
    interactive;

    /**
     * @type {boolean}
     */
    buttonMode;

    /**
     * @type {TileType}
     */
    tileType;

    /**
     * @type {number}
     */
    tileSize;

    /**
     * @type {number}
     */
    rotation;

    /**
     * @type {{x: number, y: number}}
     */
    position;

    set angle(value) {
        this.rotation = radians(value);
    }

    get angle() {
        return degrees(this.rotation);
    }

    constructor(options) {
        this.configure({
            tileAnchor: 0,
            interactive: false,
            buttonMode: false,
            tileType: null,
            tileSize: 10,
            rotation: 0,
            position: {x: 0, y: 0},
            ...options
        });
    }

    configure(options) {
        if(options.tileAnchor) {
            this.tileAnchor = options.tileAnchor;
        }

        if(options.interactive) {
            this.interactive = !!options.interactive;
        }

        if(options.buttonMode) {
            this.buttonMode = !!options.buttonMode;
        }

        if(options.tileType) {
            this.tileType = options.tileType;
        }

        if(options.tileSize) {
            this.tileSize = options.tileSize;
        }

        if(options.rotation && !options.angle) {
            this.rotation = options.rotation;
        }

        if(options.angle && !options.rotation) {
            this.angle = options.angle;
        }

        if(options.position) {
            this.position = options.position;
        }


    }

    create(options) {
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

    createAt(point) {
        this.position = {x: point.x, y: point.y};
        return this.create();
    }
}
