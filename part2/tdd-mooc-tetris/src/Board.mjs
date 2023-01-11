export class Board {
  width;
  height;

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.current_row = 0
    this.current_col = 0
    this.has_falling = false
    this.falling_block = []
    this.create_array_board()
  }

  create_array_board() {
    let board = []
    for (let row = 0; row < this.height; row++) {
      let col = []
      for (let column = 0; column < this.width; column++) {
        col.push('.')
      }
      board.push(col)
    }
    this.array_board = board;
  }


  drop(block) {
    if (this.has_falling) {
      throw "already falling"
    }
    this.falling_block = block
    this.current_row = 0
    let columns = block.columns()
    this.current_col = Math.floor((this.width - columns) / 2)
    this.draw_block()
    // this.current_row = 0 - this.falling_block.shape_start_row()
    // let rows = block.rows()
    // let columns = block.columns()
    // this.current_col = Math.floor((this.width - columns) / 2)
    // for (let row = 0; row < rows; row++) {
    //   if (row + this.current_row < 0) {
    //     continue
    //   }
    //   for (let column = 0; column < columns; column++) {
    //     this.array_board[row + this.current_row][this.current_col + column] = block.symbolAt(row, column) 
    //   }
    // }  
    this.has_falling = true
  }

  tick() {
    if (!this.has_falling) {
      return
    }
    if (!this.can_be_ticked()) {
      this.has_falling = false
      return
    }
    this.clear_falling()
    this.current_row += 1
    this.draw_block()
    // let rows = this.falling_block.rows()
    // let columns = this.falling_block.columns()
    // this.current_row += 1
    // for (let row = 0; row < rows; row++) {
    //   if (row + this.current_row < 0) {
    //     continue
    //   }
    //   for (let column = 0; column < columns; column++) {
    //     this.array_board[this.current_row + row][this.current_col + column] = this.falling_block.symbolAt(row, column)
    //   }
    // }
  }

  can_be_ticked() {
    let rows = this.falling_block.tetromino_vertical_size()[1]
    let columns = this.falling_block.tetromino_horizontal_size()[1]
    if (this.height - this.current_row - rows <= 0) {
      return false
    }
    for (let column = 0; column < columns; column++) {
      if (this.array_board[this.current_row + rows][this.current_col + column] !== ".") {
        return false
      }
    }
    return true
  }

  move_left() {
    let action_is_valid = this.validate_space(this.falling_block, this.current_row, this.current_col - 1)
    if (!action_is_valid) {
      this.draw_block()
      return
    }
    this.clear_falling()
    this.current_col -= 1
    this.draw_block()
    // try {
    //   this.draw_block()
    // } catch(err) {
    //   console.log(`
    //   Board:\n
    //   ${this.array_board}
    //   Falling shape:\n
    //   ${this.falling_block}
    //   Error information:\n
    //   ${err}
    //   Vertical information:\n
    //   ${this.falling_block.tetromino_vertical_size()}
    //   Size information:
    //   ${this.height - this.current_row}
    //   Min value for rows:
    //   ${Math.min(
    //     this.falling_block.tetromino_vertical_size()[1],
    //     this.height - this.current_row)
    //   }
    //   Column information
    //   ${this.falling_block.columns()}
    //   ${this.width - this.current_col}
    //   `)
    // }
  }

  move_right() {
    let action_is_valid = this.validate_space(this.falling_block, this.current_row, this.current_col + 1)
    if (!action_is_valid) {
      this.draw_block()
      return
    }
    this.clear_falling()
    this.current_col += 1
    this.draw_block()
  }

  move_down() {
    if (!this.hasFalling()) {
      return
    }
    this.tick()
  }

  rotate_falling_tetromino_right() {
    let rotated_block = this.falling_block.rotateRight()
    this.handle_block_rotation(rotated_block)
  }

  rotate_falling_tetromino_left() {
    let rotated_block = this.falling_block.rotateLeft()
    this.handle_block_rotation(rotated_block)
  }

  handle_block_rotation(rotated_block) {
    let can_rotate = true
    let start_row = this.current_row
    if (this.current_row < 0) {
      start_row = 0
    }
    if (!this.validate_space(rotated_block, start_row,this.current_col)) {
      can_rotate = false
    }
    if (!can_rotate && this.validate_space(rotated_block, start_row, this.current_col - 1)) {
      this.current_col -= 1
      can_rotate = true
    }
    if (!can_rotate && this.validate_space(rotated_block, start_row, this.current_col + 1)) {
      this.current_col += 1
      can_rotate = true
    }
    if (can_rotate) {
      if (this.current_row < 0) {
        this.current_row = 0
      }
      this.falling_block = rotated_block
    }
    this.draw_block()
  }

  validate_space(block, row, col) {
    if (!this.hasFalling()) {
      return
    }
    this.clear_falling()
    let block_width = block.columns()
    let block_height = block.rows()
    if (col + block_width > this.width || row + block_height > this.height) {
      return false
    }
    for (let r = 0; r < block_height; r++ ) {
      for (let c = 0; c < block_width; c++) {
        if (block.symbolAt(r, c) !== "." && this.array_board[row + r][col + c] !== ".") {
          return false
        }
      }
    }
    return true
  }

  shape_can_be_moved(col_index) {
    let rows = this.falling_block.rows()
    for (let row = 0; row < rows; row++) {
      if (this.array_board[this.current_row + row][col_index] !== ".") {
        return false
      }
    }
    return true
  }

  clear_falling() {
    let vertical_information = this.falling_block.tetromino_vertical_size()
    let vertical_start_index = vertical_information[0]
    let horizontal_information = this.falling_block.tetromino_horizontal_size()
    let horizontal_start_index = horizontal_information[0]
    let rows = vertical_information[1]
    let columns = horizontal_information[1]
    for (let row = 0; row < rows; row++) {
      let grid_row_index = this.current_row + row
      for (let column = 0; column < columns; column++) {
        let grid_col_index = this.current_col + column 
        if (this.falling_block.symbolAt(row + vertical_start_index, column + horizontal_start_index) !== ".") {
          this.array_board[grid_row_index][grid_col_index + horizontal_start_index] = '.'
        }
      }
    }
    // console.log(this.toString())
  }

  draw_block() {
    let vertical_information = this.falling_block.tetromino_vertical_size()
    let vertical_start_index = vertical_information[0]
    let horizontal_information = this.falling_block.tetromino_horizontal_size()
    let horizontal_start_index = horizontal_information[0]
    let rows = Math.min(
      vertical_information[1],
      this.height - this.current_row
    )
    let columns = Math.min(
      this.falling_block.columns(),
      this.width - this.current_col
    )
    for (let row = 0; row < rows; row++) {
      for (let column = 0; column < columns; column++) {
        // console.log(`Symbol index: ${row + vertical_start_index}. Rows: ${rows}, Cols: ${columns}, all good: ${rows > row + vertical_start_index}`)
        // console.log(`Vertical start index + row: ${vertical_start_index + row}`)
        if (this.falling_block.symbolAt(vertical_start_index + row, column) !== ".") {
          // console.log(`if true. Board symbol: ${this.array_board[this.current_row + row][this.current_col + column]}, shape symbol: ${this.falling_block.symbolAt(row + vertical_start_index, column)} `)
          this.array_board[this.current_row + row][this.current_col + column] = this.falling_block.symbolAt(row + vertical_start_index, column)
        } 
        // try {
        //   if (this.falling_block.symbolAt(vertical_start_index + row, column) !== ".") {
        //     // console.log(`if true. Board symbol: ${this.array_board[this.current_row + row][this.current_col + column]}, shape symbol: ${this.falling_block.symbolAt(row + vertical_start_index, column)} `)
        //     this.array_board[this.current_row + row][this.current_col + column] = this.falling_block.symbolAt(row + vertical_start_index, column)
        //   } 
        // } catch(err) {
        //   console.log(
        //   `
        //   Vertical pos: ${vertical_start_index + row}
        //   ArrayBoard row: ${this.current_row + row}
        //   ArrayBoard col: ${this.current_col + column}
        //   Symbol: ${this.falling_block.symbolAt(row + vertical_start_index, column)}
        //   Error:
        //   ${err}
        //   `
        //   )
        // }
      }
    }
  }

  hasFalling() {
    return this.has_falling
  }

  toString() {
    let string_board = ""
    for (let row = 0; row < this.height; row++) {
      for (let column = 0; column < this.width; column++) {
        string_board += this.array_board[row][column]
      }
      string_board += "\n"
    }
    return string_board;
  }
}
