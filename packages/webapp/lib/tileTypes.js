import * as PIXI from "pixi.js";

import TileType from "./tile/tileType.js";

export const BLANK_TILE = new TileType(PIXI.Texture.from('./assets/blankTile.png'));

export const BORDERED_TILE = new TileType(PIXI.Texture.from('./assets/borderTile.png'));

export const ORNATE_TILE = new TileType(PIXI.Texture.from('./assets/ornateTile.png'));
