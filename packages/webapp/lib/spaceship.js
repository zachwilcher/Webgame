
import {PhysicsObject} from "./physics.js";
import {TILE_SIZE} from "./tile/tile.js";
import {UnimplementedMethodError} from "./util.js";


class SpaceshipTileVisitor {
    /**
     * @abstract
     * @param tile {SpaceshipHull}
     */
    visitHull(tile) {
        throw new UnimplementedMethodError();
    }

    /**
     * @abstract
     * @param tile {SpaceshipController}
     */
    visitController(tile) {
        throw new UnimplementedMethodError();
    }


    /**
     * @abstract
     * @param tile {SpaceshipThruster}
     */
    visitThruster(tile) {
        throw new UnimplementedMethodError();
    }
}

class Collector extends SpaceshipTileVisitor {

    map;

    /**
     * @param start {SpaceshipTile}
     */
    constructor(start) {
        super();
        this.map = {};
        start.accept(this);
    }

    visit(tile) {
        if(tile && !this.map[tile.id]) {
            tile.map[tile.id] = tile;
            tile.right.visit(this);
            tile.top.visit(this);
            tile.left.visit(this);
            tile.bot.visit(this);
        }
    }

    visitHull(tile) {
        this.visit(tile);
    }

    visitController(tile) {
        this.visit(tile);
    }

    visitThruster(tile) {
        this.visit(tile);
    }
}

class Finder extends Collector {

    predicate;
    thisArg;
    results;

    constructor(start, predicate) {
        super(props);
        this.predicate = predicate;
        this.thisArg = {};
    }

    visit(tile) {
        super.visit(tile);
        if(tile && !this.map[tile.id]) {
            if(this.predicate.apply(this.thisArg, [tile])) {
                this.results.push(tile);
            }
        }
    }
}

export class SpaceshipTile {

    x;
    y;

    spaceship;
    id;

    right;
    top;
    left;
    bot;

    constructor(spaceship) {
        this.spaceship = spaceship;
        this.id = spaceship.nextId++;
    }

    accept(visitor) {
        visitor.visit(this);
    }
}

export class SpaceshipController extends SpaceshipTile {
    accept(visitor) {
        visitor.visitController(this);
    }
}

export class SpaceshipHull extends SpaceshipTile {
    accept(visitor) {
        visitor.visitHull(this);
    }
}

export class SpaceshipThruster extends SpaceshipTile {
    accept(visitor) {
        visitor.visitThruster(this);
    }
}

export class Spaceship extends PhysicsObject {

    /**
     * @type {SpaceshipTile}
     */
    controller;

    nextId = 0;

    constructor() {
        super();
    }

    tiles() {
        const collector = new Collector(this.controller);
        return Object.values(collector.map);
    }


    /**
     * will throw an exception if position is the controller or isn't adjacent to another tile
     * @param x {number}
     * @param y {number}
     * @param tile {SpaceshipTile}
     */
    setTile({x, y}, tile) {
        const nX = Math.floor(x / TILE_SIZE) * TILE_SIZE;
        const nY = Math.floor(y / TILE_SIZE) * TILE_SIZE;
        if((nX === this.controller.x) && (nY === this.controller.y)) {
            throw new Error("Tile is controller");
        }
        const finder = new Finder(this.controller, (tile) => {
            const xDist = Math.abs(tile.x - nX);
            const yDist = Math.abs(tile.y - nY);
            return (xDist <= TILE_SIZE) && (yDist <= TILE_SIZE) && !((xDist === TILE_SIZE) && (yDist === TILE_SIZE));
        });


        for(const result of finder.results) {
            if((result.x === nX) && (result.y === nY)) {
                throw new Error("Tile already occupied");
            }
        }

        if(finder.results.length === 0) {
            throw new Error("Tile isn't adjacent");
        }

        tile.x = nX;
        tile.y = nY;

        for(const tile of finder.results) {
            const xOffset = tile.x - nX;
            const yOffset = tile.y - nY;
            if((xOffset === TILE_SIZE) && (yOffset === 0)) {
                tile.right = tile;
            }
            else if((xOffset === 0) && (yOffset === -TILE_SIZE)) {
                tile.top = tile;
            }
            else if((xOffset === -TILE_SIZE) && (yOffset === 0)) {
                tile.left = tile;
            }
            else if((xOffset === 0) && (yOffset === TILE_SIZE)) {
                tile.bot = tile;
            }
        }



    }


    addHull({x, y}) {
        const tile = new SpaceshipHull(this);
        this.setTile({x, y}, tile);
    }

    addThruster({x, y}) {
        const tile = new SpaceshipThruster(this);
        this.setTile({x, y}, tile);
    }

}

