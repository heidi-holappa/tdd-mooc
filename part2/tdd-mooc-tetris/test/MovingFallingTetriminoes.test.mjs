import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";
import { ArikaTetromino } from "../src/ArikaTetromino.mjs";

function fallToBottom(board) {
  for (let i = 0; i < 10; i++) {
    board.tick();
  }
}

describe("Moving falling tetrominoes", () => {
  let board;
  beforeEach(() => {
    board = new Board(10, 6);
  });

  it("a falling tetromino can be moved left", () => {
    board.drop(ArikaTetromino.T_SHAPE); 
    board.move_left()

    expect(board.toString()).to.equalShape(
      `..TTT.....
       ...T......
       ..........
       ..........
       ..........
       ..........`
    );
  });

  xit("a falling tetromino can be moved right", () => {
    board.drop(ArikaTetromino.T_SHAPE); 
    board.move_right()

    expect(board.toString()).to.equalShape(
      `....TTT...
       .....T....
       ..........
       ..........
       ..........
       ..........`
    );
  });

  it("a falling tetromino can be moved down", () => {
    board.drop(ArikaTetromino.T_SHAPE); 
    board.move_down()

    expect(board.toString()).to.equalShape(
      `..........
       ...TTT....
       ....T.....
       ..........
       ..........
       ..........`
    );
  });

  xit("it cannot be moved left beyond the board", () => {
    board.drop(ArikaTetromino.T_SHAPE); 
    for (let i = 0; i < 10; i++) {
      board.move_left()
    }

    expect(board.toString()).to.equalShape(
      `TTT.......
       .T........
       ..........
       ..........
       ..........
       ..........`
    );
  });

  xit("it cannot be moved right beyond the board", () => {
    board.drop(ArikaTetromino.T_SHAPE); 
    for (let i = 0; i < 10; i++) {
      board.move_right()
    }

    expect(board.toString()).to.equalShape(
      `.......TTT
       ........T.
       ..........
       ..........
       ..........
       ..........`
    );
  });

  it("it cannot be moved down beyond the board (will stop falling)", () => {
    board.drop(Tetromino.T_SHAPE); 
    for (let i = 0; i < 10; i++) {
      board.move_down()
    }

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       ....T.....
       ...TTT....`
    );
  });

  it("it cannot be moved left through other blocks", () => {
    board.array_board[0][1] = "T"
    board.array_board[1][0] = "T"
    board.array_board[1][1] = "T"
    board.array_board[1][2] = "T"
    board.drop(Tetromino.T_SHAPE);
    board.move_left()

    expect(board.toString()).to.equalShape(
      `.T..T.....
       TTTTTT....
       ..........
       ..........
       ..........
       ..........`
    );
  });

  it("it cannot be moved right through other blocks", () => {
    board.array_board[0][7] = "T"
    board.array_board[1][6] = "T"
    board.array_board[1][7] = "T"
    board.array_board[1][8] = "T"
    board.drop(Tetromino.T_SHAPE);
    board.move_right()

    expect(board.toString()).to.equalShape(
      `....T..T..
       ...TTTTTT.
       ..........
       ..........
       ..........
       ..........`
    );
  });

  it("it cannot be moved down through other blocks (will stop falling)", () => {
    board.drop(Tetromino.T_SHAPE); 
    fallToBottom(board);
    board.drop(Tetromino.T_SHAPE);
    for (let i = 0; i < 10; i++) {
      board.move_down()
    }

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ....T.....
       ...TTT....
       ....T.....
       ...TTT....`
    );
  });

});

