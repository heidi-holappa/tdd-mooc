export class Board {
  width;
  height;

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.currentRow = 0
    this.currentColumn = 0
    this.has_falling = false
    this.fallingBlock = []
    // this.createArrayBoard()
    this.arrayBoard = this.createArrayBoard()
  }

  createArrayBoard() {
    let board = []
    for (let row = 0; row < this.height; row++) {
      let col = []
      for (let column = 0; column < this.width; column++) {
        col.push('.')
      }
      board.push(col)
    }
    // this.arrayBoard = board;
    return board
  }


  drop(block) {
    if (this.has_falling) {
      throw "already falling"
    }
    this.currentRow = 0
    let columns = block.columns()
    this.currentColumn = Math.floor((this.width - columns) / 2)
    if (!this.validateSpace(block, this.currentRow, this.currentColumn)) {
      this.has_falling = false
      throw "GAME OVER"
    }
    this.fallingBlock = block
    this.has_falling = true
    this.drawBlock()
  }

  tick() {
    if (!this.has_falling) {
      return
    }
    if (!this.canBeTicked()) {
      this.checkAndClearLines()
      this.has_falling = false
      return
    }
    this.clearFalling()
    this.currentRow += 1
    this.drawBlock()
  }

  canBeTicked() {
    let rows = this.fallingBlock.tetrominoVerticalSize()[1]
    let columns = this.fallingBlock.tetrominoHorizontalSize()[1]
    let shapeStartColumn = this.currentColumn + this.fallingBlock.tetrominoHorizontalSize()[0]
    if (this.height - this.currentRow - rows <= 0) {
      return false
    }
    for (let column = 0; column < columns; column++) {
      if (this.arrayBoard[this.currentRow + rows][shapeStartColumn + column] !== ".") {
        return false
      }
    }
    return true
  }

  moveLeft() {
    if (this.currentColumn + this.fallingBlock.tetrominoHorizontalSize()[0] <= 0) {
      return 
    }
    let actionIsValid = this.validateSpace(this.fallingBlock, this.currentRow, this.currentColumn - 1)
    if (!actionIsValid) {
      this.drawBlock()
      return
    }
    this.clearFalling()
    this.currentColumn -= 1
    this.drawBlock()
  }

  moveRight() {
    let action_is_valid = this.validateSpace(this.fallingBlock, this.currentRow, this.currentColumn + 1)
    if (!action_is_valid) {
      this.drawBlock()
      return
    }
    this.clearFalling()
    this.currentColumn += 1
    this.drawBlock()
  }

  moveDown() {
    if (!this.hasFalling()) {
      return
    }
    this.tick()
  }

  rotate_falling_tetromino_right() {
    let rotatedBlock = this.fallingBlock.rotateRight()
    this.handleBlockRotation(rotatedBlock)
  }

  rotate_falling_tetromino_left() {
    let rotatedBlock = this.fallingBlock.rotateLeft()
    this.handleBlockRotation(rotatedBlock)
  }

  handleBlockRotation(rotatedBlock) {
    let canRotate = true
    let startRow = this.currentRow
    if (!this.validateSpace(rotatedBlock, startRow,this.currentColumn)) {
      canRotate = false
    }
    if (!canRotate && this.validateSpace(rotatedBlock, startRow, this.currentColumn - 1)) {
      this.currentColumn -= 1
      canRotate = true
    }
    if (!canRotate && this.validateSpace(rotatedBlock, startRow, this.currentColumn + 1)) {
      this.currentColumn += 1
      canRotate = true
    }
    if (canRotate) {
      if (this.currentRow < 0) {
        this.currentRow = 0
      }
      this.fallingBlock = rotatedBlock
    }
    this.drawBlock()
  }

  validateSpace(block, gridRow, gridCol) {
    if (!this.hasFalling()) {
      let rows = block.tetrominoVerticalSize()[1]
      let columns = block.tetrominoHorizontalSize()[1]
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < columns; col++) {
          if (this.arrayBoard[gridRow + row][gridCol + col] !== ".") {
            return false
          }
        }
      }
      return true
    }
    this.clearFalling()
    let shapeWidth = block.tetrominoHorizontalSize()[1]
    let shapeHeight = block.tetrominoVerticalSize()[1]
    if (gridCol + shapeWidth > this.width || gridRow + shapeHeight > this.height) {
      return false
    }
    for (let r = 0; r < shapeHeight; r++ ) {
      for (let c = 0; c < shapeWidth; c++) {
        if (block.symbolAt(r, c) !== "." && this.arrayBoard[gridRow + r][gridCol + c] !== ".") {
          return false
        }
      }
    }
    return true
  }

  clearFalling() {
    let verticalInformation = this.fallingBlock.tetrominoVerticalSize()
    let verticalStartIndex = verticalInformation[0]
    let horizontalInformation = this.fallingBlock.tetrominoHorizontalSize()
    let horizontalStartIndex = horizontalInformation[0]
    let rows = verticalInformation[1]
    let columns = horizontalInformation[1]
    for (let row = 0; row < rows; row++) {
      let gridRowIndex = this.currentRow + row
      for (let column = 0; column < columns; column++) {
        let gridColIndex = this.currentColumn + column 
        if (this.fallingBlock.symbolAt(row + verticalStartIndex, column + horizontalStartIndex) !== ".") {
          this.arrayBoard[gridRowIndex][gridColIndex + horizontalStartIndex] = '.'
        }
      }
    }
  }

  checkAndClearLines() {
    let rowsToClear = new Set()
    for (let row = 0; row < this.height; row++) {
      let lineIsFull = true
      for (let col = 0; col < this.width; col++) {
        if (this.arrayBoard[row][col] === ".") {
          lineIsFull = false
        }
      }
      if (lineIsFull) {
        rowsToClear.add(row)
      }
    }
    if (rowsToClear.size === 0) {
      return
    }
    let board = this.createArrayBoard()
    let cleared = 0
    // console.log(`Rows to clear: ${[...rowsToClear]}`)
    for (let row = this.height - 1; row >= 0; row--) {
      while (true) {
        if (rowsToClear.has(row - cleared)) {
          cleared += 1
        } else {
          break
        }
      }
      for (let col = 0; col < this.width; col++) {
        
        if (row - cleared < 0) {
          continue
        }
        // console.log(`Iterating: row=${row}, col=${col}. Arrayboard symbol: ${this.arrayBoard[row - cleared][col]}`)
        board[row][col] = this.arrayBoard[row - cleared][col]
      }
    }
    this.arrayBoard = board
  }

  drawBlock() {
    let verticalInformation = this.fallingBlock.tetrominoVerticalSize()
    let verticalStartIndex = verticalInformation[0]
    let horizontalInformation = this.fallingBlock.tetrominoHorizontalSize()
    let horizontalStartIndex = horizontalInformation[0]
    if (this.currentColumn + horizontalInformation[1] + horizontalStartIndex > this.width) {
      this.currentColumn = this.currentColumn - horizontalStartIndex
    }
    let rows = Math.min(
      verticalInformation[1],
      this.height - this.currentRow
    )
    let columns = Math.min(
      this.fallingBlock.columns(),
      this.width - this.currentColumn
    )
    for (let row = 0; row < rows; row++) {
      for (let column = 0; column < columns; column++) {
        if (this.fallingBlock.symbolAt(verticalStartIndex + row, column) !== ".") {
          this.arrayBoard[this.currentRow + row][this.currentColumn + column] = this.fallingBlock.symbolAt(row + verticalStartIndex, column)
        } 
      }
    }
  }

  hasFalling() {
    return this.has_falling
  }

  toString() {
    let boardAsString = ""
    for (let row = 0; row < this.height; row++) {
      for (let column = 0; column < this.width; column++) {
        boardAsString += this.arrayBoard[row][column]
      }
      boardAsString += "\n"
    }
    return boardAsString;
  }
}
