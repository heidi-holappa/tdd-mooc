import { expect } from "chai";
import { LinesClearedObserver } from "../src/LinesClearedObserver.mjs";
import { NintendoScoringSystem } from "../src/NintendoScoringSystem.mjs"
import { Board } from "../src/Board.mjs";

describe("On observer listening to cleared lines", () => {
  let nss;
  let observer;
  let board;
  
  beforeEach(() => {
    nss = new NintendoScoringSystem();
    observer = new LinesClearedObserver();
    board = new Board(10, 6)
  });

  it("with no subscribers subscriber-list is empty", () => {
    expect(observer.subscribers.size).to.equal(0)
  });

  it("an object can subscribe to Observer class", () => {
    observer.subscribe(nss)
    expect(observer.subscribers.size).to.equal(1)
  })

  it ("A subscription can be cancelled", () => {
    let numberOfSubscribersAtStart = observer.subscribers.size
    observer.subscribe(nss)
    observer.unsubscribe(nss)
    let numberOfSubscribersAtEnd = observer.subscribers.size
    expect(numberOfSubscribersAtStart).to.equal(numberOfSubscribersAtEnd)
  })

  it ("When a notification arrives, points are distributed", () => {
    observer.subscribe(nss)
    observer.notifyLinesCleared(4)
    expect(nss.getPoints()).to.equal(1200)    
  })

});
