export class Board {
  width;
  height;

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.active_location = 0
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
    let shape = `X`
    let newblock_index = Math.floor(this.width / 2)
    let newboard = this.board.substring(0, newblock_index) + shape + this.board.substring(newblock_index + 1)
    this.board = newboard
    this.active_location = newblock_index
  }

  tick() {
    let old_location = this.active_location
    let new_location = this.active_location + this.width + 1
    let updated_board = this.board.substring(0, old_location) + `.` + this.board.substring(old_location + 1, new_location) + `X` + this.board.substring(new_location + 1)
    this.board = updated_board
  }

  toString() {
    return this.board;
  }
}
