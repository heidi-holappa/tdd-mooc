export class Board {
  width;
  height;

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.current_row = 0
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
    let start_index = Math.floor((this.width - columns) / 2)
    let newboard2 = this.board
    for (let row = 0; row < rows; row++) {
      for (let column = 0; column < columns; column++) {
        this.array_board[row][start_index + column] = block.symbolAt(row, column)
        
        // let new_block_index = start_index + this.width * row + column 
        // let start_of_board = newboard2.substring(0, new_block_index)
        // let symbol = block.symbolAt(row,column)
        // let end_of_board = newboard2.substring(new_block_index + 1)
        // newboard2 = start_of_board + symbol + end_of_board 
      }
    }
    this.board = newboard2
    this.current_row = 0
    
    // let newblock_index = Math.floor(this.width / 2)
    // let newboard = this.board.substring(0, newblock_index) + shape + this.board.substring(newblock_index + 1)
    // this.board = newboard
    // this.current_row = newblock_index
    
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

    // let total_indexes = this.width * this.height
    // let new_index = this.current_row + this.width + 1
    // if (total_indexes - this.current_row > this.width && this.board[new_index] === `.` ) {
    //   let old_location = this.current_row
    //   let color = this.board.substring(old_location, old_location + 1)
    //   let new_location = this.current_row + this.width + 1
    //   this.current_row = new_location
    //   let updated_board = this.board.substring(0, old_location) + `.` + this.board.substring(old_location + 1, new_location) + color + this.board.substring(new_location + 1)
    //   this.board = updated_board
    // } else {
    //   this.has_falling = false
    // }
  }

  hasFalling() {
    return this.has_falling
  }

  toString() {
    // console.log("Width/Height: ", this.width, this.height)
    // console.log(this.array_board)
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
