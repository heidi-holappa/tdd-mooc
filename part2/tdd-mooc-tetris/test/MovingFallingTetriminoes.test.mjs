import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { ArikaTetromino } from "../src/ArikaTetromino.mjs";

function fallToBottom(board) {
  for (let i = 0; i < 10; i++) {
    board.tick();
  }
}

describe("Moving falling T-shape tetrominoes", () => {
  let board;
  beforeEach(() => {
    board = new Board(10, 6);
  });

  it("a falling tetromino can be moved left", () => {
    board.drop(ArikaTetromino.T_SHAPE); 
    board.moveLeft()

    expect(board.toString()).to.equalShape(
      `..TTT.....
       ...T......
       ..........
       ..........
       ..........
       ..........`
    );
  });

  it("a falling tetromino can be moved right", () => {
    board.drop(ArikaTetromino.T_SHAPE); 
    board.moveRight()

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
    board.moveDown()

    expect(board.toString()).to.equalShape(
      `..........
       ...TTT....
       ....T.....
       ..........
       ..........
       ..........`
    );
  });

  it("it cannot be moved left beyond the board", () => {
    board.drop(ArikaTetromino.T_SHAPE); 
    for (let i = 0; i < 10; i++) {
      board.moveLeft()
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

  it("it cannot be moved right beyond the board", () => {
    board.drop(ArikaTetromino.T_SHAPE); 
    for (let i = 0; i < 10; i++) {
      board.moveRight()
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
    board.drop(ArikaTetromino.T_SHAPE); 
    for (let i = 0; i < 10; i++) {
      board.moveDown()
    }

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       ...TTT....
       ....T.....`
    );
  });

  it("it cannot be moved left through other blocks", () => {
    board.arrayBoard[0][1] = "T"
    board.arrayBoard[1][0] = "T"
    board.arrayBoard[1][1] = "T"
    board.arrayBoard[1][2] = "T"
    board.drop(ArikaTetromino.T_SHAPE);
    board.moveLeft()

    expect(board.toString()).to.equalShape(
      `.T.TTT....
       TTT.T.....
       ..........
       ..........
       ..........
       ..........`
    );
  });

  it("it cannot be moved right through other blocks", () => {
    board.arrayBoard[0][7] = "T"
    board.arrayBoard[1][6] = "T"
    board.arrayBoard[1][7] = "T"
    board.arrayBoard[1][8] = "T"
    board.drop(ArikaTetromino.T_SHAPE);
    board.moveRight()

    expect(board.toString()).to.equalShape(
      `...TTT.T..
       ....T.TTT.
       ..........
       ..........
       ..........
       ..........`
    );
  });

  it("it cannot be moved down through other blocks (will stop falling)", () => {
    board.drop(ArikaTetromino.T_SHAPE); 
    fallToBottom(board);
    board.drop(ArikaTetromino.T_SHAPE);
    for (let i = 0; i < 10; i++) {
      board.moveDown()
    }

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ...TTT....
       ....T.....
       ...TTT....
       ....T.....`
    );
  });

});

describe("Moving falling O-shape tetrominoes", () => {
  let board;
  beforeEach(() => {
    board = new Board(10, 6);
  });

  it("a falling tetromino can be moved left", () => {
    board.drop(ArikaTetromino.O_SHAPE); 
    board.moveLeft()

    expect(board.toString()).to.equalShape(
      `...OO.....
       ...OO.....
       ..........
       ..........
       ..........
       ..........`
    );
  });

  it("it cannot be moved left beyond the board", () => {
    board.drop(ArikaTetromino.O_SHAPE); 
    for (let i = 0; i < 10; i++) {
      board.moveLeft()
    }

    expect(board.toString()).to.equalShape(
      `OO........
       OO........
       ..........
       ..........
       ..........
       ..........`
    );
  });

  it("a falling tetromino can be moved right", () => {
    board.drop(ArikaTetromino.O_SHAPE); 
    board.moveRight()

    expect(board.toString()).to.equalShape(
      `.....OO...
       .....OO...
       ..........
       ..........
       ..........
       ..........`
    );
  });

  it("it cannot be moved right beyond the board", () => {
    board.drop(ArikaTetromino.O_SHAPE); 
    for (let i = 0; i < 10; i++) {
      board.moveRight()
    }

    expect(board.toString()).to.equalShape(
      `........OO
       ........OO
       ..........
       ..........
       ..........
       ..........`
    );
  });

});

