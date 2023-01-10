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
