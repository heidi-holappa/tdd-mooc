export class Board {
  width;
  height;

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.active_location = 0
    this.has_falling = false
    this.create_board()
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

  drop(block) {
    if (this.has_falling) {
      throw "already falling"
    }
    let shape = block.color
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
