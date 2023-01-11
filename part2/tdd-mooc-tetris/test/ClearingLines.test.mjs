import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { ArikaTetromino } from "../src/ArikaTetromino.mjs";

function fallToBottom(board) {
  for (let i = 0; i < 10; i++) {
    board.tick();
  }
}

describe("When a line becomes complete", () => {
  let board;
  beforeEach(() => {
    board = new Board(10, 6);
  });

  it("dropping two T-shapes I-shape complete the bottom line", () => {
    board.drop(ArikaTetromino.T_SHAPE); 
    board.rotate_falling_tetromino_right()
    board.rotate_falling_tetromino_right()
    for (let i = 0; i < 10; i++) {
      board.moveLeft()
    }
    fallToBottom(board)
    board.drop(ArikaTetromino.I_SHAPE)
    fallToBottom(board)
    board.drop(ArikaTetromino.T_SHAPE)
    board.rotate_falling_tetromino_right()
    board.rotate_falling_tetromino_right()
    for (let i = 0; i < 10; i++) {
        board.moveRight()
    }
    for (let i = 0; i < 4; i++) {
      board.tick()
    }

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       .T......T.
       TTTIIIITTT`
    );
  });

  it("and then one more tick clears the lowest line", () => {
    board.drop(ArikaTetromino.T_SHAPE); 
    board.rotate_falling_tetromino_right()
    board.rotate_falling_tetromino_right()
    for (let i = 0; i < 10; i++) {
      board.moveLeft()
    }
    fallToBottom(board)
    board.drop(ArikaTetromino.I_SHAPE)
    fallToBottom(board)
    board.drop(ArikaTetromino.T_SHAPE)
    board.rotate_falling_tetromino_right()
    board.rotate_falling_tetromino_right()
    for (let i = 0; i < 10; i++) {
        board.moveRight()
    }
    for (let i = 0; i < 4; i++) {
      board.tick()
    }
    board.tick()

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       ..........
       .T......T.`
    );
  });

  it("dropping four I-shapes and an O-shape complete the two bottom lines", () => {
    board.drop(ArikaTetromino.I_SHAPE); 
    for (let i = 0; i < 10; i++) {
      board.moveLeft()
    }
    fallToBottom(board)
    board.drop(ArikaTetromino.I_SHAPE); 
    for (let i = 0; i < 10; i++) {
      board.moveLeft()
    }
    fallToBottom(board)
    board.drop(ArikaTetromino.I_SHAPE)
    board.moveRight()
    fallToBottom(board)
    board.drop(ArikaTetromino.I_SHAPE)
    board.moveRight()
    fallToBottom(board)
    board.drop(ArikaTetromino.O_SHAPE)
    for (let i = 0; i < 10; i++) {
        board.moveRight()
    }
    for (let i = 0; i < 4; i++) {
      board.tick()
    }
    
    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       IIIIIIIIOO
       IIIIIIIIOO`
    );
  });

  it("and one more tick clears the board", () => {
    board.drop(ArikaTetromino.I_SHAPE); 
    for (let i = 0; i < 10; i++) {
      board.moveLeft()
    }
    fallToBottom(board)
    board.drop(ArikaTetromino.I_SHAPE); 
    for (let i = 0; i < 10; i++) {
      board.moveLeft()
    }
    fallToBottom(board)
    board.drop(ArikaTetromino.I_SHAPE)
    board.moveRight()
    fallToBottom(board)
    board.drop(ArikaTetromino.I_SHAPE)
    board.moveRight()
    fallToBottom(board)
    board.drop(ArikaTetromino.O_SHAPE)
    for (let i = 0; i < 10; i++) {
        board.moveRight()
    }
    for (let i = 0; i < 4; i++) {
      board.tick()
    }
    board.tick()
    
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
