import * as PIXI from "pixi.js";

import TileType from "./tile/tileType.js";

export const BLANK_TILE = new TileType(PIXI.Texture.from('./assets/blankTile.png'), 'BLANK_TILE');

export const BORDERED_TILE = new TileType(PIXI.Texture.from('./assets/borderTile.png'), "BORDERED_TILE");

export const ORNATE_TILE = new TileType(PIXI.Texture.from('./assets/ornateTile.png'), "ORNATE_TILE");

export const SPACESHIP_HULL = new TileType(PIXI.Texture.from('./assets/blankTile.png'), "SPACESHIP_HULL");

export const SPACESHIP_CONTROLLER = new TileType(PIXI.Texture.from('./assets/ornateTile.png'), "SPACESHIP_CONTROLLER");

export const SPACESHIP_THRUSTER = new TileType(PIXI.Texture.from('./assets/thruster.png'), "SPACESHIP_THRUSTER");

