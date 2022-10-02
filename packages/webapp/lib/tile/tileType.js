import * as PIXI from "pixi.js";

export default class TileType {

    /**
     * @type {PIXI.Texture}
     */
    texture;

    /**
     * @returns {number}
     */
    get size() {
        return this.texture.width;
    }

    /**
     * @param texture {PIXI.Texture}
     */
    constructor(texture) {
        this.texture = texture;
    }

    createSprite() {
        const sprite = new PIXI.Sprite(this.texture);

        return sprite;
    }

}
