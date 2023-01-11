export class ArikaTetromino {
    static T_SHAPE = new ArikaTetromino(
      0, 
      3,
    [`....
     TTT.
     .T..
     ....`,
    `.T..
     TT..
     .T..
     ....`,
    `....
     .T..
     TTT.
     ....`,
    `.T..
     .TT.
     .T..
     ....`])
    static I_SHAPE = new ArikaTetromino(
      0,
      1,
    [
    `....
     IIII
     ....
     ....`,
     `..I.
      ..I.
      ..I.
      ..I.`
    ])
    static O_SHAPE = new ArikaTetromino(
      0,
      0,
    [`....
     .OO.
     .OO.
     ....`]) 

    constructor (current_rotation, rotations, shapes) {
      this.current_rotation = current_rotation
      this.rotations = rotations
      this.shapes = shapes
      if (typeof shapes[current_rotation] == "string") {
          this.shape = shapes[current_rotation]
            .replaceAll(" ", "")
            .trim()
            .split("\n")
            .map((row) => row.split(""));
      } else {
          this.shape = shapes[current_rotation];
      }
    }

    rotateRight() {
      if (this.current_rotation === this.rotations) {
        return new ArikaTetromino(0, this.rotations, this.shapes)
      }
      return new ArikaTetromino(this.current_rotation + 1, this.rotations, this.shapes)
    }
    
    rotateLeft() {
      if (this.current_rotation === 0) {
        return new ArikaTetromino(this.rotations, this.rotations, this.shapes)
      }
      return new ArikaTetromino(this.current_rotation - 1, this.rotations, this.shapes)
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

    tetromino_horizontal_size() {
      let start_col_index = this.shape.length
      let end = 0
      for (let row = 0; row < this.shape.length; row++) {
        let first_col = this.shape.length
        let last_col = 0
        let symbol_found = false
        for (let col = 0; col < this.shape[0].length; col++) {
          if (this.shape[row][col] !== ".") {
            if (!symbol_found) {
              first_col = col
              symbol_found = true
            } 
            last_col = col
          }
        }
        start_col_index = Math.min(start_col_index, first_col)
        end = Math.max(end, last_col)
      }
      let shape_size = end - start_col_index + 1
      // console.log(`TETROMINO COL SIZE:\n${this.toString()}\nfirst index:${start_col_index}\nshape size:${shape_size}`)
      return [start_col_index, shape_size]
    }

    tetromino_vertical_size() {
      let start_row_index = this.shape.length
      let end_row_index = 0
      for (let col = 0; col < this.shape[0].length; col++) {
        let first_row = this.shape.length
        let last_row = 0
        let symbol_found = false
        for (let row = 0; row < this.shape.length; row++) {
          if (this.shape[row][col] !== ".") {
            if (!symbol_found) {
              first_row = row
              symbol_found = true
            }
            last_row = row
          }          
        }
        start_row_index = Math.min(start_row_index, first_row)
        end_row_index = Math.max(end_row_index, last_row)
      }
      let shape_size = end_row_index - start_row_index + 1
      // console.log(`TETROMINO ROW SIZE:\n${this.toString()}\nfirst index:${start_row_index}\nsize:${shape_size}`)
      return [start_row_index, shape_size]
    }



    columns() {
      return this.shape[0].length
    }

    empty_space_left() {
      let shape_width = 0
      for (let row = 0; row < this.shape.length; row++) {
        this_row_width = 0
        for (let col = 0; col < this.shape[0].length; col++) {
          if (this.shape[row][col] !== ".") {
            this_row_width = col
          }
        }
        shape_width = max(this_row_width, shape_width)
      }
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