export class Tetromino {
    static T_SHAPE = new Tetromino(
      1, 
      4,
    `.T.
    TTT
    ...`)
    static I_SHAPE = new Tetromino(
      1,
      2,
    `.....
    .....
    IIII.
    .....
    .....`)
    static O_SHAPE = new Tetromino(
      1,
      1,
    `.OO
    .OO
    ...`) 

    constructor (current_rotation, rotations, shape) {
      this.current_rotation = current_rotation
      this.rotations = rotations
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

    rotateRight() {
      if (this.rotations === 1) {
        return this
      }
      if (this.rotations === 2 && this.current_rotation === 2) {
        return Tetromino.I_SHAPE
      }
      let n = this.shape.length
      let shape = Array.from({
          length: n
        }, () => new Array(n).fill(0));
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
        let new_current = this.current_rotation + 1
        return new Tetromino(new_current,this.rotations,shape);
      }
    
    rotateLeft() {
      return this.rotateRight().rotateRight().rotateRight();
    }

    rows() {
      let symbol_found = false
      let length = 0
      for (let row = 0; row < this.shape.length; row++) {
        let has_symbol = false
        for (let col = 0; col < this.shape[0].length; col++) {
          if (this.shape[row][col] !== ".") {
            has_symbol = true
            symbol_found = true
          }
        }
        if (has_symbol || !symbol_found) {
          length += 1
        }
        has_symbol = false
      }
      // console.log("Length", length)
      return length 
    }

    shape_start_row() {
      for (let row = 0; row < this.rows(); row++) {
        for (let col = 0; col < this.columns(); col++) {
          if (this.shape[row][col] !== ".") {
            return row
          }
        }
      }
      return this.rows()
    }

    columns() {
      return this.shape[0].length
    }

    symbolAt(row, column) {
      return this.shape[row][column]
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
}