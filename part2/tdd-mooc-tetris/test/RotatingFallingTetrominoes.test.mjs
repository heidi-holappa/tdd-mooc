import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";

function fallToBottom(board) {
  for (let i = 0; i < 10; i++) {
    board.tick();
  }
}

describe("Falling T-shape tetrominoes", () => {
  let board;
  beforeEach(() => {
    board = new Board(10, 6);
  });

  it("can be rotated right", () => {
    board.drop(Tetromino.T_SHAPE);
    board.rotate_falling_tetromino_right()
    
    expect(board.toString()).to.equalShape(
      `....T.....
       ....TT....
       ....T.....
       ..........
       ..........
       ..........`
    );
  });

  xit("can be rotated left", () => {
    board.drop(Tetromino.T_SHAPE);
    board.rotate_falling_tetromino_left()

    expect(board.toString()).to.equalShape(
      `....T.....
       ...TT.....
       ....T.....
       ..........
       ..........
       ..........`
    );
  });

  xit("can be rotated left twice", () => {
    board.drop(Tetromino.T_SHAPE);
    board.rotate_falling_tetromino_left()
    board.rotate_falling_tetromino_left()

    expect(board.toString()).to.equalShape(
      `..........
       ...TTT....
       ....T.....
       ..........
       ..........
       ..........`
    );
  });

  xit("can be rotated right twice", () => {
    board.drop(Tetromino.T_SHAPE);
    board.rotate_falling_tetromino_right()
    board.rotate_falling_tetromino_right()

    expect(board.toString()).to.equalShape(
      `..........
       ...TTT....
       ....T.....
       ..........
       ..........
       ..........`
    );
  });

  xit("wall kick in left side", () => {
    board.drop(Tetromino.T_SHAPE);
    board.rotate_falling_tetromino_right()
    for (let i = 0; i < 10; i++) {
      board.move_left()
    }
    board.rotate_falling_tetromino_right()

    expect(board.toString()).to.equalShape(
      `..........
       TTT.......
       .T........
       ..........
       ..........
       ..........`
    );
  });

  xit("wall kick in right side", () => {
    board.drop(Tetromino.T_SHAPE);
    board.rotate_falling_tetromino_left()
    for (let i = 0; i < 10; i++) {
      board.move_right()
    }
    board.rotate_falling_tetromino_left()

    expect(board.toString()).to.equalShape(
      `..........
       .......TTT
       ........T.
       ..........
       ..........
       ..........`
    );
  });

  xit("piece at the bottom can not be rotated", () => {
    board.drop(Tetromino.T_SHAPE);
    board.tick()
    board.rotate_falling_tetromino_left()
    for (let i = 0; i < 10; i++) {
      board.move_right()
    }

    board.rotate_falling_tetromino_left()

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       ..........
       ..........`
    );
  });

});
