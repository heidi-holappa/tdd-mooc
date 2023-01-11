export class Block {
  color;

  constructor(color) {
    this.shape = color;
  }

  rows() {
    return 1
  }
  
  columns() {
    return 1
  }

  tetromino_vertical_size() {
    return [0, this.rows()]
  }
  tetromino_horizontal_size() {
    return [0, this.columns()]
  }

  symbolAt(row, col) {
    return this.shape
  }

  shape_start_row() {
    return 0
  }

  toString() {
    return this.shape
  }

}
