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
    observer.subscribers.size = 0
  });

});
