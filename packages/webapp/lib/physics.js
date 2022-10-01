
import {Vec2} from "./math.js";

export const MIN_VELOCITY_MAGNITUDE = .01;
export const MIN_VELOCITY_MAGNITUDE_SQUARED = MIN_VELOCITY_MAGNITUDE * MIN_VELOCITY_MAGNITUDE;
export const MIN_ROTATION_VELOCITY_MAGNITUDE = .001;


export class PhysicsObject {
    position = new Vec2(0, 0);
    velocity = new Vec2(0, 0);
    rotation = 0;
    rotationVelocity = 0;

    update(dt) {
        this.position = this.position.add(this.velocity.scale(dt));
        this.rotation += this.rotationVelocity * dt;

        if(this.velocity.magnitudeSquared() < MIN_VELOCITY_MAGNITUDE_SQUARED) {
            this.velocity = new Vec2(0, 0);
        }

        if(Math.abs(this.rotationVelocity) < MIN_ROTATION_VELOCITY_MAGNITUDE) {
            this.rotationVelocity = 0;
        }
    }

    /**
     * @param {Vec2} [out]
     * @returns {Vec2} Unit vector in direction this object is rotated
     */
    direction(out= new Vec2(0, 0)) {
        out.x = Math.cos(this.rotation);
        out.y = Math.sin(this.rotation);
        return out;
    }

    /**
     * @returns {number} x coordinate
     */
    get x() {
        return this.position.x;
    }

    /**
     * @param {number} x
     */
    set x(x) {
        this.position.x = x;
    }

    /**
     * @returns {number} y coordinate
     */
    get y() {
        return this.position.y;
    }

    /**
     * @param {number} y
     */
    set y(y) {
        this.position.y = y;
    }

}
