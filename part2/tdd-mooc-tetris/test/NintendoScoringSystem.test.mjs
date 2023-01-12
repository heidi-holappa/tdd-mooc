import { expect } from "chai";
import { NintendoScoringSystem } from "../src/NintendoScoringSystem.mjs"

describe("On Nintendo Scoring System", () => {
  let nss;
  beforeEach(() => {
    nss = new NintendoScoringSystem();
  });

  it("Clearing one line on level zero gives 40 points", () => {
    let points = nss.getPoints(0, 1);
    expect(points).to.equal(40); 
  });

  it("Clearing two lines on level zero gives 100 points", () => {
    let points = nss.getPoints(0, 2);
    expect(points).to.equal(100); 

  });

  it("Clearing three lines on level zero gives 300 points", () => {
    let points = nss.getPoints(0, 3);
    expect(points).to.equal(300); 

  });

  it("Clearing four lines on level zero gives 1200 points", () => {
    let points = nss.getPoints(0, 4);
    expect(points).to.equal(1200); 

  });

  it("Clearing 4 lines on level 9 gives 12000 points", () => {
    let level = 9
    let lines = 4
    let points = nss.getPoints(level, lines);
    expect(points).to.equal(12000); 
  });

});
