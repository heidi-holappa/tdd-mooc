export class RotatingShape {
  shape;

  constructor(shape) {
    if (typeof shape == "string") {
      this.shape = shape
        .replaceAll(" ", "")
        .trim()
        .split("\n")
        .map((row) => row.split(""));
    } else {
      this.shape = shape;
    }
  }

  toString() {
    let str_shape = "";
    for (let row_index = 0; row_index < this.shape.length; row_index++) {
      for (
        let column_index = 0;
        column_index < this.shape[row_index].length;
        column_index++
      ) {
        str_shape += this.shape[row_index][column_index];
      }
      str_shape += "\n";
    }
    return str_shape;
  }

  rotateRight() {
    let shape = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];
    for (let row_index = 0; row_index < this.shape.length; row_index++) {
      for (
        let column_index = 0;
        column_index < this.shape[row_index].length;
        column_index++
      ) {
        shape[column_index][row_index] = this.shape[row_index][column_index];
      }
    }
    for (let row_index = 0; row_index < this.shape.length; row_index++) {
      shape[row_index].reverse();
    }
    return new RotatingShape(shape);
  }
  rotateLeft() {
    return this.rotateRight().rotateRight().rotateRight();
  }
}
