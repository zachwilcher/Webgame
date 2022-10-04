import * as PIXI from "pixi.js";

export default class TileType {

    name;

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
    constructor(texture, name) {
        this.texture = texture;
        this.name = name;
    }

    createSprite(data = {}) {
        const sprite = new PIXI.Sprite(this.texture);
        sprite.tileType = this;
        return sprite;
    }

}
