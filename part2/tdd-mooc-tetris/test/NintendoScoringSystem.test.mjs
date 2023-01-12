import { expect } from "chai";
import { NintendoScoringSystem } from "../src/NintendoScoringSystem.mjs"

describe("On Nintendo Scoring System", () => {

  it("Clearing one line on level zero gives 40 points", () => {
    let nss = new NintendoScoringSystem()
    let points = nss.getPoints(0, 1)

    expect(points).to.equal(40); 
  });

});
