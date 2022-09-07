/**
 * @callback GridCallback
 * @param element {*}
 * @param indices {[number, number]} [row, col]
 * @param grid {Grid} The grid the callback is applied to
 */

/**
 *  @class Grid
 *  A 2D array class
 */
export class Grid {

    _array = [];
    _rows = 0;
    _cols = 0;


    /**
     * @param callbackFn {GridCallback}
     * @param [thisArg] {Object}
     */
    forEach(callbackFn, thisArg) {
        for(let i = 0; i < this.rows; i++) {
            for(let j = 0; j < this.cols; j++) {
                callbackFn.apply(thisArg, [this.get(i,j), [i, j], this]);
            }
        }
    }

    /**
     * Returns the underlying array (read only)
     * @returns {*[]}
     */
    get array() {
        return this._array;
    }

    /**
     * Returns the number of rows
     * @returns {number}
     */
    get rows() {
        return this._rows;
    }

    /**
     * Returns the number of columns
     * @returns {number}
     */
    get cols() {
        return this._cols;
    }

    /**
     * @param rows {number}
     * @param cols {number}
     * @param [fill] {*}
     */
    constructor(rows=0, cols=0, fill=null) {
        this._rows = rows;
        this._cols = cols;
        this._array = new Array(this._rows * this._cols).fill(fill);
    }

    /**
     *
     * @param rows {number}
     * @param cols {number}
     * @param array {*[]} array with length >= rows * cols
     */
    static from(rows, cols, array) {
        const result = new Grid(rows, cols);
        for(let i = 0; i < rows; i++) {
            for(let j = 0; j < cols; j++) {
                result.set(i, j, array[i + cols * j]);
            }
        }
    }

    /**
     * @param row {number}
     * @param col {number}
     * @returns {*}
     */
    get(row, col) {
        const index = this.index(row, col);
        return this._array[index];
    }

    /**
     * @param row {number}
     * @param col {number}
     * @param element {*}
     * @returns {*} what was there initially
     */
    set(row, col, element) {
        const index = this.index(row, col);
        const oldElement = this._array[index];
        this._array[index] = element;
        return oldElement;
    }

    /**
     * Get the index given a row and col
     * @param row {number}
     * @param col {number}
     * @returns {number}
     */
    index(row, col) {
        return row + col * this._cols;
    }

    /**
     * @param row {number}
     * @returns {*[]}
     */
    getRow(row) {
        const result = [];
        for(let j = 0; j < this._cols; j++) {
            result.push(this.get(row, j));
        }
        return result;
    }

    /**
     * @param col {number}
     * @returns {*[]}
     */
    getCol(col) {
        const result = [];
        for(let i = 0; i < this._rows; i++) {
            result.push(this.get(i, col))
        }
        return result;
    }

    /**
     * @param rows {number}
     * @param cols {number}
     * @returns {Grid}
     */
    resize(rows, cols) {
        const result = new Grid(rows, cols);
        for(let row = 0; row < Math.min(this._rows, result._rows); row++) {
            for(let col = 0; col < Math.min(this._cols, result._cols); col++) {
                result.set(row, col, this.get(row, col));
            }
        }
        return result;
    }

    /**
     * Determine if the grid is empty
     * @returns {boolean}
     */
    empty() {
        return (this._rows === 0) && (this._cols === 0);
    }

    /**
     * Given a bigger grid return a new grid with this grid placed into it
     * with this (0, 0) starting at (row, col) in bigger grid
     * @param grid {Grid}
     * @param row {number}
     * @param col {number}
     */
    emplace(grid, row, col) {
        const result = new Grid(grid._rows, grid._cols);
        for(let i = 0; i < grid._rows; i++) {
            for(let j = 0; j < grid._cols; j++) {
                if((row <= i) && (i < this._rows) && (col <= j) && (j < this._cols)) {
                    result.set(i, j, this.get(i - row, j - col));
                }
                else
                {
                    result.set(i, j, grid.get(i, j));
                }
            }
        }
        return result;
    }

    /**
     * Returns a subgrid of this grid
     * @param row {number}
     * @param col {number}
     * @param rows {number}
     * @param cols {number}
     * @returns {Grid}
     */
    subgrid(row, col, rows, cols) {
        const result = new Grid(rows, cols);
        for(let i = 0; i < rows; i++) {
            for(let j = 0; j < cols; j++) {
                result.set(i, j, this.get(row + i, col + j));
            }
        }
        return result;
    }

    /**
     * @param row {number} which row to insert after
     * @param [insert] array of stuff to insert
     * @returns {Grid} a grid containing this grid's stuff and the inserted row
     */
    insertRow(row, insert=null) {
        const result = new Grid(this._rows + 1, this._cols);

        for(let i = 0; i < row; i++) {
            for(let j = 0; j < this._cols; j++) {
                result.set(i, j, this.get(i, j));
            }
        }

        if(Array.isArray(insert)) {
            for(let j = 0; j < Math.min(this._cols, insert.length); j++) {
                result.set(row, j, insert[j]);
            }
        }

        for(let i = row + 1; i < this._rows + 1; i++) {
            for(let j = 0; j < this._cols; j++) {
                result.set(i, j, this.get(i - 1, j));
            }
        }
        return result;
    }

    /**
     * @param col {number} which col to insert after
     * @param [insert] array of stuff to insert
     * @returns {Grid} a grid containing this grid's stuff and the inserted column
     */
    insertCol(col, insert=null) {
        const result = new Grid(this._rows, this._cols + 1);

        for(let i = 0; i < this._rows; i++) {
            for(let j = 0; j < col; j++) {
                result.set(i, j, this.get(i, j));
            }
        }

        if(Array.isArray(insert)) {
            for(let i = 0; i < Math.min(this._rows, insert.length); i++) {
                result.set(i, col, insert[i]);
            }
        }

        for(let i = 0; i < this._rows; i++) {
            for(let j = col + 1; j < this._cols + 1; j++) {
                result.set(i, j, this.get(i, j - 1));
            }
        }

        return result;
    }

}
