import { expect } from "chai";
import { diceHandValue } from "../src/testable2.mjs";
import { shuffleBag } from "../src/testable2.mjs";

describe("Testable 2: a dice game", () => {
  it("function return a number value", () => {
    expect(diceHandValue()).to.be.a("number");
  });

  it("Rolling two sixes yields 106", () => {
    let result = diceHandValue(6, 6);
    expect(result).to.equal(106);
  });

  it("Rolling two separate values returns highest value", () => {
    let result = diceHandValue(1, 2);
    expect(result).to.equal(2);
  });

  it("Shufflebag returns all included values", () => {
    let items = {
      1: 10,
      2: 10,
      3: 10,
      4: 10,
      5: 10,
      6: 10,
    };
    let itemCount = 0;
    let bag = new shuffleBag();
    for (let key in items) {
      bag.add(key, items[key]);
      itemCount += items[key];
    }
    let shuffleItems = bag.itemCount();
    expect(shuffleItems).to.equal(itemCount);
  });

  it("Shufflebag returns the same amount of each item as was put in", () => {
    let items = {
      1: 10,
      2: 10,
      3: 10,
      4: 10,
      5: 10,
      6: 10,
    };
    let itemCount = 0;
    let bag = new shuffleBag();
    for (let key in items) {
      bag.add(key, items[key]);
      itemCount += items[key];
    }
    for (let i = 0; i < itemCount; i++) {
      let item = bag.getItem();
      items[item] -= 1;
    }
    let itemCountAfterPicking = 0;
    for (let key in items) {
      itemCountAfterPicking += items[key];
    }
    expect(itemCountAfterPicking).to.equal(0);
  });
});
