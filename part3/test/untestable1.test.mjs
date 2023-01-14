import { expect } from "chai";
import { daysUntilChristmas } from "../src/testable1.mjs";

describe("Untestable-to-testable 1: days until Christmas", () => {
  it("returns a number", () => {
    // TODO: write proper tests
    expect(daysUntilChristmas()).to.be.a("number");
  });

  it("returns 1 on Dec 23th", () => {
    const eveOfXmasEve = new Date(2023, 11, 22);
    const xmasDay = new Date(2023, 11, 24);
    expect(daysUntilChristmas(eveOfXmasEve, xmasDay)).to.equal(2);
  });

  it("returns 0 on Dec 25th", () => {
    const xmasDay = new Date(2023, 11, 24);
    expect(daysUntilChristmas(xmasDay, xmasDay)).to.equal(0);
  });
});
