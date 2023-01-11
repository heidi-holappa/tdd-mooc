import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { ArikaTetromino } from "../src/ArikaTetromino.mjs";

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
    board.drop(ArikaTetromino.T_SHAPE);

    expect(board.toString()).to.equalShape(
      `...TTT....
       ....T.....
       ..........
       ..........
       ..........
       ..........`
    );
  });

  it("stop when they hit the bottom", () => {
    board.drop(ArikaTetromino.T_SHAPE);
    fallToBottom(board);

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       ...TTT....
       ....T.....`
    );
  });

  it("stop when they land on another block", () => {
    board.drop(ArikaTetromino.T_SHAPE);
    fallToBottom(board);
    board.drop(ArikaTetromino.T_SHAPE);
    fallToBottom(board);

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ...TTT....
       ....T.....
       ...TTT....
       ....T.....`
    );
  });

  it("when shape cannot be dropped a GAME OVER is thrown", () => {
    board.drop(ArikaTetromino.T_SHAPE);
    fallToBottom(board);
    board.drop(ArikaTetromino.T_SHAPE);
    fallToBottom(board);
    board.drop(ArikaTetromino.T_SHAPE);
    fallToBottom(board);
    const before = board.toString();
    expect(() => board.drop(ArikaTetromino.T_SHAPE)).to.throw("GAME OVER");
    const after = board.toString();
    expect(after).to.equal(before);
  });
});

describe("Falling I-shape tetrominoes", () => {
  let board;
  beforeEach(() => {
    board = new Board(10, 6);
  });

  it("start from the top middle", () => {
    board.drop(ArikaTetromino.I_SHAPE);

    expect(board.toString()).to.equalShape(
      `...IIII...
       ..........
       ..........
       ..........
       ..........
       ..........`
    );
  });

  it("after one tick drops one level", () => {
    board.drop(ArikaTetromino.I_SHAPE);
    board.tick()

    expect(board.toString()).to.equalShape(
      `..........
       ...IIII...
       ..........
       ..........
       ..........
       ..........`
    );
  });

  it("stops at bottom", () => {
    board.drop(ArikaTetromino.I_SHAPE);
    for (let i = 0; i < 10; i++) {
      board.tick()
    }

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       ..........
       ...IIII...`
    );
  });

    it("stops when another piece is below", () => {
      board.drop(ArikaTetromino.I_SHAPE);
      for (let i = 0; i < 10; i++) {
        board.tick()
      }
      board.drop(ArikaTetromino.I_SHAPE);
      for (let i = 0; i < 10; i++) {
        board.tick()
      }
      
  
      expect(board.toString()).to.equalShape(
        `..........
         ..........
         ..........
         ..........
         ...IIII...
         ...IIII...`
      );
  });

  describe("Falling O-shape tetrominoes", () => {
    let board;
    beforeEach(() => {
      board = new Board(10, 6);
    });
  
    it("start from the top middle", () => {
      board.drop(ArikaTetromino.O_SHAPE);
  
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
      board.drop(ArikaTetromino.O_SHAPE);
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

    it("stops if other shape is below", () => {
      board.drop(ArikaTetromino.O_SHAPE);
      for (let i = 0; i < 10; i++) {
        board.tick()
      }
      board.drop(ArikaTetromino.O_SHAPE);
      for (let i = 0; i < 10; i++) {
        board.tick()
      }
  
      expect(board.toString()).to.equalShape(
        `..........
         ..........
         ....OO....
         ....OO....
         ....OO....
         ....OO....`
      );
    });
  
  });

  describe("Falling various shaped tetrominoes", () => {
    let board;
    beforeEach(() => {
      board = new Board(10, 6);
    });

    it("I-shape stops when T-shape is below", () => {
      board.drop(ArikaTetromino.T_SHAPE);
      for (let i = 0; i < 10; i++) {
        board.tick()
      }
      board.drop(ArikaTetromino.I_SHAPE);
      for (let i = 0; i < 10; i++) {
        board.tick()
      }
  
      expect(board.toString()).to.equalShape(
        `..........
         ..........
         ..........
         ...IIII...
         ...TTT....
         ....T.....`
      );
    });

    it("O-shape stops when I and T-shape are below", () => {
      board.drop(ArikaTetromino.T_SHAPE);
      for (let i = 0; i < 10; i++) {
        board.tick()
      }
      board.drop(ArikaTetromino.I_SHAPE);
      for (let i = 0; i < 10; i++) {
        board.tick()
      }
      board.drop(ArikaTetromino.O_SHAPE);
      for (let i = 0; i < 10; i++) {
        board.tick()
      }
  
      expect(board.toString()).to.equalShape(
        `..........
         ....OO....
         ....OO....
         ...IIII...
         ...TTT....
         ....T.....`
      );
    });

  });

});
