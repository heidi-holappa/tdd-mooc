import { expect } from "chai";
import { LinesClearedObserver } from "../src/LinesClearedObserver.mjs";
import { NintendoScoringSystem } from "../src/NintendoScoringSystem.mjs"
import { Board } from "../src/Board.mjs";

describe("On observer listening to cleared lines", () => {
  let nss;
  let observer;
  
  beforeEach(() => {
    nss = new NintendoScoringSystem();
    observer = new LinesClearedObserver();
  });

  it("with no subscribers subscriber-list is empty", () => {
    expect(observer.getNumberOfSubscribers()).to.equal(0)
  });

  it("an object can subscribe to Observer class", () => {
    observer.subscribe(nss)
    expect(observer.getNumberOfSubscribers()).to.equal(1)
  })

  it ("A subscription can be cancelled", () => {
    let numberOfSubscribersAtStart = observer.getNumberOfSubscribers()
    observer.subscribe(nss)
    observer.unsubscribe(nss)
    let numberOfSubscribersAtEnd = observer.getNumberOfSubscribers()
    expect(numberOfSubscribersAtStart).to.equal(numberOfSubscribersAtEnd)
  })

  it ("When a notification arrives, points are distributed", () => {
    observer.subscribe(nss)
    observer.notifyLinesCleared(4)
    expect(nss.getPoints()).to.equal(1200)    
  })

});

describe("A board using an observer", () => {
    let nss;
    let observer;
    let board;
    
    beforeEach(() => {
      nss = new NintendoScoringSystem();
      observer = new LinesClearedObserver();
      observer.subscribe(nss)
      board = new Board(10, 6)
      board.notifier = observer
    });

    it("when one line at level 0 is cleared, 40 points are stored", () => {
        
        board.arrayBoard = [
            ['.', '.','.','.','.','.','.','.','.','.'],
            ['.', '.','.','.','.','.','.','.','.','.'],
            ['.', '.','.','.','.','.','.','.','.','.'],
            ['.', '.','.','.','.','.','.','.','.','.'],
            ['.', '.','.','.','.','.','.','.','.','.'],
            ['T', 'T','T','T','T','T','T','T','T','T']
        ]
        board.checkAndClearLines()
        expect(nss.getPoints()).to.equal(40)
    })

    it("when three lines at level 0 is cleared, 300 points are stored", () => {
        
        board.arrayBoard = [
            ['.', '.','.','.','.','.','.','.','.','.'],
            ['.', '.','.','.','.','.','.','.','.','.'],
            ['.', '.','.','.','.','.','.','.','.','.'],
            ['T', 'T','T','T','T','T','T','T','T','T'],
            ['T', 'T','T','T','T','T','T','T','T','T'],
            ['T', 'T','T','T','T','T','T','T','T','T']
        ]
        board.checkAndClearLines()
        expect(nss.getPoints()).to.equal(300)
    })

    it("when four lines at level 0 is cleared, 1200 points are stored", () => {
        
        board.arrayBoard = [
            ['.', '.','.','.','.','.','.','.','.','.'],
            ['.', '.','.','.','.','.','.','.','.','.'],
            ['T', 'T','T','T','T','T','T','T','T','T'],
            ['T', 'T','T','T','T','T','T','T','T','T'],
            ['T', 'T','T','T','T','T','T','T','T','T'],
            ['T', 'T','T','T','T','T','T','T','T','T']
        ]
        board.checkAndClearLines()
        expect(nss.getPoints()).to.equal(1200)
    })

})


// export class BoardStub {

//     checkAndClearLines() {
//         return 1
//     }
// }