
export const MIN_VELOCITY_MAGNITUDE = .01;
export const MIN_VELOCITY_MAGNITUDE_SQUARED = MIN_VELOCITY_MAGNITUDE * MIN_VELOCITY_MAGNITUDE;
export const MIN_ROTATION_VELOCITY_MAGNITUDE = .001;

export class Vec2 {

    x;
    y;

    /**
     * @param {number} x
     * @param {number} y
     */
    constructor(x,y) {
        this.x = x;
        this.y = y;
    }

    /**
     * @returns {number} x**2 + y**2
     */
    get magnitudeSquared() {
        return this.x * this.x + this.y * this.y;
    }

    /**
     * x = y = 0
     */
    zero() {
        this.x = 0;
        this.y = 0;
    }

    /**
     * @param {Vec2} other
     * @returns {Vec2} sum of this and other
     */
    add(other) {
        return new Vec2(this.x + other.x, this.y + other.y);
    }

    /**
     * @returns {Vec2} -1 * x, -1 * y
     */
    neg() {
        return this.scale(-1);
    }

    /**
     * @param {number} scalar
     * @returns {Vec2} x * scalar, y * scalar
     */
    scale(scalar) {
        return new Vec2(scalar * this.x, scalar * this.y)
    }

    /**
     * @param {number} rotation angle in radians
     * @returns {Vec2} vector rotated by rotation
     */
    rotate(rotation) {
        const sin = Math.sin(rotation);
        const cos = Math.cos(rotation);
        return new Vec2(this.x * cos - this.y * sin, this.x * sin + this.y * cos);
    }

    /**
     * @param {Vec2} other
     * @returns {number} dot product
     */
    dot(other) {
        return this.x * other.x + this.y * other.y;
    }

}

export class PhysicsObject {
    position = new Vec2(0, 0);
    velocity = new Vec2(0, 0);
    rotation = 0;
    rotationVelocity = 0;

    update(dt) {
        this.position = this.position.add(this.velocity.scale(dt));
        this.rotation += this.rotationVelocity * dt;

        if(this.velocity.magnitudeSquared < MIN_VELOCITY_MAGNITUDE_SQUARED) {
            this.velocity.zero();
        }

        if(Math.abs(this.rotationVelocity) < MIN_ROTATION_VELOCITY_MAGNITUDE) {
            this.rotationVelocity = 0;
        }

    }

    /**
     * @returns {Vec2} Unit vector in direction this object is rotated
     */
    get direction() {
        return new Vec2(Math.cos(this.rotation), Math.sin(this.rotation));
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
