import { expect } from "chai";
import { NintendoScoringSystem } from "../src/NintendoScoringSystem.mjs"

describe("On Nintendo Scoring System", () => {
  let nss;
  beforeEach(() => {
    nss = new NintendoScoringSystem();
  });

  it("Clearing one line on level zero gives 40 points", () => {
    nss.setPoints(1);
    expect(nss.getPoints()).to.equal(40); 
  });

  it("Clearing two lines on level zero gives 100 points", () => {
    nss.setPoints(2)
    expect(nss.getPoints()).to.equal(100); 

  });

  it("Clearing three lines on level zero gives 300 points", () => {
    nss.setPoints(3)
    expect(nss.getPoints()).to.equal(300); 

  });

  it("Clearing four lines on level zero gives 1200 points", () => {
    nss.setPoints(4)
    expect(nss.getPoints()).to.equal(1200); 

  });

  it("Clearing 4 lines on level 9 gives 12000 points", () => {
    nss.level = 9
    nss.setPoints(4)
    expect(nss.getPoints()).to.equal(12000); 
  });

});
