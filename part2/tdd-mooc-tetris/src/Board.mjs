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
    this.create_board()
    this.create_array_board()
  }

  create_board() {
    let board = ''
    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        board += `.`
      }
      board += `\n`
    }
    this.board = board;
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
    let rows = block.rows()
    let columns = block.columns()
    this.current_col = Math.floor((this.width - columns) / 2)
    let newboard2 = this.board
    for (let row = 0; row < rows; row++) {
      for (let column = 0; column < columns; column++) {
        this.array_board[row][this.current_col + column] = block.symbolAt(row, column)
      }
    }
    this.board = newboard2
    this.current_row = 0  
    this.has_falling = true
  }

  tick() {
    if (!this.has_falling) {
      return
    }
    if (this.current_row + this.falling_block.rows() >= this.height) {
      this.has_falling = false
      return
    }
    let rows = this.falling_block.rows()
    let columns = this.falling_block.columns()
    let start_index = Math.floor((this.width - columns) / 2)
    for (let column = 0; column < this.falling_block.columns(); column++) {
      if (this.array_board[this.current_row + this.falling_block.rows()][start_index + column] !== ".") {
        this.has_falling = false
        return 
      }
    }
    for (let row = 0; row < rows; row++) {
      for (let column = 0; column < columns; column++) {
        this.array_board[this.current_row + row][start_index + column] = '.'
      }
    }
    this.current_row += 1
    for (let row = 0; row < rows; row++) {
      for (let column = 0; column < columns; column++) {
        this.array_board[this.current_row + row][start_index + column] = this.falling_block.symbolAt(row, column)
      }
    }
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

  move_left() {
    if (this.current_col === 0) {
      return
    }
    if (!this.shape_can_be_moved(this.current_col -1 )) {
      this.has_falling = false
      return
    }
    this.clear_falling()
    this.current_col -= 1
    this.draw_block()
  }

  move_right() {
    let columns = this.falling_block.columns()
    if (this.current_col + columns === this.width) {
      return
    }
    if (!this.shape_can_be_moved(this.current_col + this.falling_block.columns())) {
      this.has_falling = false
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
    if (!this.hasFalling()) {
      return
    }
    this.clear_falling();
    if (!this.validate_space(rotated_block, this.current_row,this.current_col)) {
      this.draw_block()
      return
    }
    this.falling_block = rotated_block
    this.draw_block();
  }

  clear_falling() {
    let rows = this.falling_block.rows()
    let columns = this.falling_block.columns()
    for (let row = 0; row < rows; row++) {
      for (let column = 0; column < columns; column++) {
        let row_index = this.current_row + row
        let col_index = this.current_col + column 
        if (this.falling_block.symbolAt(row, column) !== ".") {
          this.array_board[row_index][col_index] = '.'
        }
      }
    }
  }

  draw_block() {
    let rows = this.falling_block.rows()
    let columns = this.falling_block.columns()
    for (let row = 0; row < rows; row++) {
      for (let column = 0; column < columns; column++) {
        if (this.falling_block.symbolAt(row, column) !== ".") {
          this.array_board[this.current_row + row][this.current_col + column] = this.falling_block.symbolAt(row, column)
        } 
      }
    }
  }

  validate_space(block, row, col) {
    let block_width = block.columns()
    let block_height = block.rows()
    if (col + block_width > this.width || row + block_height > this.height) {
      console.log("First if fails")
      return false
    }
    for (let r = 0; r < block_height; r++ ) {
      for (let c = 0; c < block_width; c++) {
        if (block.symbolAt(r, c) !== "." && this.array_board[row + r][col + c] !== ".") {
          console.log("For if fails", row+r, col+c, this.array_board[row + r][col+ c]) 
          return false
        }
      }
    }
    return true
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
