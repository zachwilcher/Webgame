
import { Point, IPointData } from '@pixi/math';
import '@pixi/math-extras';

export const MIN_VELOCITY_MAGNITUDE = .01;
export const MIN_VELOCITY_MAGNITUDE_SQUARED = MIN_VELOCITY_MAGNITUDE * MIN_VELOCITY_MAGNITUDE;
export const MIN_ROTATION_VELOCITY_MAGNITUDE = .001;


export class PhysicsObject {
    position = new Point(0, 0);
    velocity = new Point(0, 0);
    rotation = 0;
    rotationVelocity = 0;

    update(dt) {
        this.position.add(this.velocity.multiplyScalar(dt), this.position);
        this.rotation += this.rotationVelocity * dt;

        if(this.velocity.magnitudeSquared() < MIN_VELOCITY_MAGNITUDE_SQUARED) {
            this.velocity = new Point(0, 0);
        }

        if(Math.abs(this.rotationVelocity) < MIN_ROTATION_VELOCITY_MAGNITUDE) {
            this.rotationVelocity = 0;
        }
    }

    /**
     * @param {IPointData} [outPoint]
     * @returns {IPointData} Unit vector in direction this object is rotated
     */
    direction(outPoint) {
        if(!outPoint) {
            outPoint = new Point();
        }
        outPoint.x = Math.cos(this.rotation);
        outPoint.y = Math.sin(this.rotation);
        return outPoint
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
