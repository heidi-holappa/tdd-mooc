import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { ArikaTetromino } from "../src/ArikaTetromino.mjs"

describe("Falling T-shape tetrominoes", () => {
  let board;
  beforeEach(() => {
    board = new Board(10, 6);
  });

  it("can be rotated right", () => {
    board.drop(ArikaTetromino.T_SHAPE);
    board.rotate_falling_tetromino_right()
    
    expect(board.toString()).to.equalShape(
      `....T.....
       ...TT.....
       ....T.....
       ..........
       ..........
       ..........`
    );
  });

  it("can be rotated left", () => {
    board.drop(ArikaTetromino.T_SHAPE);
    board.rotate_falling_tetromino_left()

    expect(board.toString()).to.equalShape(
      `....T.....
       ....TT....
       ....T.....
       ..........
       ..........
       ..........`
    );
  });

  it("can be rotated left twice", () => {
    board.drop(ArikaTetromino.T_SHAPE);
    board.rotate_falling_tetromino_left()
    board.rotate_falling_tetromino_left()

    expect(board.toString()).to.equalShape(
      `....T.....
       ...TTT....
       ..........
       ..........
       ..........
       ..........`
    );
  });

  it("can be rotated right twice", () => {
    board.drop(ArikaTetromino.T_SHAPE);
    board.rotate_falling_tetromino_right()
    board.rotate_falling_tetromino_right()

    expect(board.toString()).to.equalShape(
      `....T.....
       ...TTT....
       ..........
       ..........
       ..........
       ..........`
    );
  });

  it("wall kick in left-most side", () => {
    board.drop(ArikaTetromino.T_SHAPE);
    board.rotate_falling_tetromino_right()
    for (let i = 0; i < 10; i++) {
      board.moveLeft()
    }
    board.rotate_falling_tetromino_right()

    expect(board.toString()).to.equalShape(
      `.T........
       TTT.......
       ..........
       ..........
       ..........
       ..........`
    );
  });

  it("wall kick if another piece blocks the way", () => {
    board.drop(ArikaTetromino.T_SHAPE);
    board.rotate_falling_tetromino_left()
    for (let i = 0; i < 10; i++) {
      board.moveLeft()
    }
    board.has_falling = false
    board.drop(ArikaTetromino.T_SHAPE)
    board.rotate_falling_tetromino_right()
    board.moveLeft()
    board.moveLeft()
    board.rotate_falling_tetromino_right()

    expect(board.toString()).to.equalShape(
      `T..T......
       TTTTT.....
       T.........
       ..........
       ..........
       ..........`
    );
  });



  it("wall kick in right-most side", () => {
    board.drop(ArikaTetromino.T_SHAPE);
    board.rotate_falling_tetromino_left()
    for (let i = 0; i < 10; i++) {
      board.moveRight()
    }
    board.rotate_falling_tetromino_left()

    expect(board.toString()).to.equalShape(
      `........T.
       .......TTT
       ..........
       ..........
       ..........
       ..........`
    );
  });

  it("piece at the bottom can not be rotated", () => {
    board.drop(ArikaTetromino.T_SHAPE);
    for (let i = 0; i < 4; i++) {
      board.tick()
    }
    board.rotate_falling_tetromino_right()

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       ...TTT....
       ....T.....`
    );
  });

});


describe("Falling I-shape tetrominoes", () => {
  let board;
  beforeEach(() => {
    board = new Board(10, 6);
  });

  it("can be rotated right", () => {
    board.drop(ArikaTetromino.I_SHAPE);
    board.rotate_falling_tetromino_right()
    
    expect(board.toString()).to.equalShape(
      `.....I....
       .....I....
       .....I....
       .....I....
       ..........
       ..........`
    );
  });

});