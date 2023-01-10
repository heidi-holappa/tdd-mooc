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

  it("start from the top middle", () => {
    board.drop(Tetromino.T_SHAPE);

    expect(board.toString()).to.equalShape(
      `....T.....
       ...TTT....
       ..........
       ..........
       ..........
       ..........`
    );
  });

  it("stop when they hit the bottom", () => {
    board.drop(Tetromino.T_SHAPE);
    fallToBottom(board);

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       ....T.....
       ...TTT....`
    );
  });

  it("stop when they land on another block", () => {
    board.drop(Tetromino.T_SHAPE);
    fallToBottom(board);
    board.drop(Tetromino.T_SHAPE);
    fallToBottom(board);

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

describe("Falling I-shape tetrominoes", () => {
  let board;
  beforeEach(() => {
    board = new Board(10, 6);
  });

  it("start from the top middle", () => {
    board.drop(Tetromino.I_SHAPE);

    expect(board.toString()).to.equalShape(
      `..IIII....
       ..........
       ..........
       ..........
       ..........
       ..........`
    );
  });

  xit("after one tick drops one level", () => {
    board.drop(Tetromino.I_SHAPE);
    board.tick()

    expect(board.toString()).to.equalShape(
      `..........
       ..IIII....
       ..........
       ..........
       ..........
       ..........`
    );
  });

  it("stops at bottom", () => {
    board.drop(Tetromino.I_SHAPE);
    for (let i = 0; i < 10; i++) {
      board.tick()
    }

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       ..........
       ..IIII....`
    );
  });

    it("stops when another piece is below", () => {
      board.drop(Tetromino.I_SHAPE);
      for (let i = 0; i < 10; i++) {
        board.tick()
      }
      board.drop(Tetromino.I_SHAPE);
      for (let i = 0; i < 10; i++) {
        board.tick()
      }
      
  
      expect(board.toString()).to.equalShape(
        `..........
         ..........
         ..........
         ..........
         ..IIII....
         ..IIII....`
      );
  });

  describe("Falling O-shape tetrominoes", () => {
    let board;
    beforeEach(() => {
      board = new Board(10, 6);
    });
  
    it("start from the top middle", () => {
      board.drop(Tetromino.O_SHAPE);
  
      expect(board.toString()).to.equalShape(
        `....OO....
         ....OO....
         ..........
         ..........
         ..........
         ..........`
      );
    });

    it("stop at the bottom", () => {
      board.drop(Tetromino.O_SHAPE);
      for (let i = 0; i < 10; i++) {
        board.tick()
      }
  
      expect(board.toString()).to.equalShape(
        `..........
         ..........
         ..........
         ..........
         ....OO....
         ....OO....`
      );
    });
  
  });

});
