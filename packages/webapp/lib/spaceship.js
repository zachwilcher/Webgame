
import {PhysicsObject} from "./physics.js";
import TileGrid from "./tile/tileGrid.js";
import {SPACESHIP_CONTROLLER} from "./tileTypes.js";



export class Spaceship extends PhysicsObject {

    sector;

    tileGrid;

    tileBuilder;

    /**
     * @type {SpaceshipTile}
     */
    controller;

    tiles;


    constructor(position) {
        super();
        this.position = position;

        this.tileGrid = new TileGrid(10);

        this.tileBuilder = this.tileGrid.createBuilder();
        this.tileBuilder.tileType = SPACESHIP_CONTROLLER;
        this.controller = this.tileGrid.createAt({x: 0, y: 0});


    }



}

