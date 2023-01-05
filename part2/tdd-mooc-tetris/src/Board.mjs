export class Board {
  width;
  height;

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.active_location = 0
    this.has_falling = false
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
    let shape = block.shape
    let rows = block.rows()
    let columns = block.columns()
    // let start_index = Math.floor((this.width - columns) / 2)
    // let newboard2 = this.board
    // for (let row = 0; row < rows; row++) {
    //   for (let column = 0; column < columns; column++) {
    //     let start_of_board = newboard2.substring(0, start_index + this.width * row + column)
    //     let symbol = block.symbolAt(row,column)
    //     let end_of_board = this.board.substring(start_of_board + 1)
    //     newboard2 = start_of_board + symbol + end_of_board 
    //   }
    // }
    // this.board = newboard2
    // this.active_location = start_index
    
    let newblock_index = Math.floor(this.width / 2)
    let newboard = this.board.substring(0, newblock_index) + shape + this.board.substring(newblock_index + 1)
    this.board = newboard
    this.active_location = newblock_index
    
    this.has_falling = true
  }

  tick() {
    let total_indexes = this.width * this.height
    let new_index = this.active_location + this.width + 1
    if (total_indexes - this.active_location > this.width && this.board[new_index] === `.` ) {
      let old_location = this.active_location
      let color = this.board.substring(old_location, old_location + 1)
      let new_location = this.active_location + this.width + 1
      this.active_location = new_location
      let updated_board = this.board.substring(0, old_location) + `.` + this.board.substring(old_location + 1, new_location) + color + this.board.substring(new_location + 1)
      this.board = updated_board
    } else {
      this.has_falling = false
    }
  }

  hasFalling() {
    return this.has_falling
  }

  toString() {
    return this.board;
  }
}
