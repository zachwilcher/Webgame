import * as PIXI from 'pixi.js';
import {PhysicsObject} from "./lib/physics.js";


const canvas = document.body.querySelector('#game-canvas');

const app = new PIXI.Application({view: canvas, backgroundColor: 0x1099bb});


class Spaceship extends PhysicsObject {
    fuel = 10;
    baseMass = 10;
    thrustForce = 1;
    thrusting = false;
    thrustingLeft = false;
    thrustingRight = false;
    rotationAcceleration = 0.001;

    sprite;

    constructor(path) {
        super();
        this.sprite = PIXI.Sprite.from(path);
        this.sprite.anchor.set(0.5);
        this.sprite.rotation = Math.PI / 2;
        this.x = app.screen.width / 2;
        this.y = app.screen.height / 2;
        app.stage.addChild(this.sprite);

    }
    get mass() {
        return this.baseMass + this.fuel;
    }

    update(dt) {
        super.update(dt);

        if(this.thrusting) {
            const deltaV = this.direction.scale(this.thrustForce * dt / this.mass);
            this.velocity = this.velocity.add(deltaV);
        }
        if(this.thrustingLeft) {
            this.rotationVelocity += -this.rotationAcceleration * dt;
        }
        if(this.thrustingRight) {
            this.rotationVelocity += this.rotationAcceleration * dt;
        }

        // sync sprite
        this.sprite.x = this.x;
        this.sprite.y = this.y;
        this.sprite.rotation = this.rotation + Math.PI / 2;

    }

}


const spaceship = new Spaceship('assets/spaceship.png');

app.ticker.add((dt) => {
    spaceship.update(dt);
});


document.addEventListener('keydown', (event) => {
    switch(event.key) {
        case "w":
            spaceship.thrusting = true;
            break;
        case "a":
            spaceship.thrustingLeft = true;
            break;
        case "d":
            spaceship.thrustingRight = true;
            break;
    }
});

document.addEventListener('keyup', (event) => {
    switch(event.key) {
        case "w":
            spaceship.thrusting = false;
            break;
        case "a":
            spaceship.thrustingLeft = false;
            break;
        case "d":
            spaceship.thrustingRight = false;
            break;
    }
});

