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

  toString() {
    return this.shape
  }

}
