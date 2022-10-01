
export class Vec2 {
    /**
     * @type {number}
     */
    x;

    /**
     * @type {number}
     */
    y;

    /**
     * @param x {number}
     * @param y {number}
     */
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    /**
     * @param other {{x: number, y: number}}
     * @returns {Vec2}
     */
    static from(other) {
        return new Vec2(other.x, other.y);
    }

    /**
     * @returns {Vec2}
     */
    clone() {
        return new Vec2(this.x, this.y);
    }

    /**
     * @param other {{x: number, y: number}}
     */
    equals(other) {
        return (this.x === other.x) && (this.y === other.y);
    }

    /**
     * @param other {{x: number, y: number}}
     */
    copyTo(other) {
        other.x = this.x;
        other.y = this.y;
    }

    /**
     * @param other {{x: number, y: number}}
     */
    copyFrom(other) {
        this.x = other.x;
        this.y = other.y;
    }

    /**
     * @param x {number}
     * @param y {number}
     */
    set(x = 0, y = x) {
        this.x = x;
        this.y = y;
    }

    /**
     * @returns {number}
     */
    magnitudeSquared() {
        return this.x * this.x + this.y * this.y;
    }

    /**
     * @param rotation {number} angle in radians
     * @returns {Vec2} new vector rotated counter-clockwise by rotation
     */
    rotate(rotation) {
        const sin = Math.sin(rotation);
        const cos = Math.cos(rotation);
        return new Vec2(this.x * cos - this.y * sin, this.x * sin + this.y * cos);
    }

    /**
     * dot product
     * @param other {Vec2}
     * @returns {number}
     */
    dot(other) {
        return this.x * other.x + this.y * other.y;
    }

    /**
     * @param scalar {number}
     * @returns {Vec2}
     */
    scale(scalar) {
        return new Vec2(this.x * scalar, this.y * scalar);
    }

    /**
     * @param other {Vec2}
     * @returns {Vec2}
     */
    add(other) {
        return new Vec2(this.x + other.x, this.y + other.y);
    }
}


/**
 *
 * @param rotation angle in radians
 * @returns {number} angle in degrees
 */
export function degrees(rotation) {
    return rotation * 180.0 / Math.PI;
}

/**
 * @param angle angle in degrees
 * @returns {number} angle in radians
 */
export function radians(angle) {
    return angle * Math.PI / 180.0;
}

