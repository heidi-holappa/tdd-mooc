import { expect } from "chai";
import { parsePeopleCsv } from "../src/testable3.mjs";
import { writeFile } from "node:fs/promises";
import { unlink } from "node:fs/promises";

// example input:
// Loid,Forger,,Male
// Anya,Forger,6,Female
// Yor,Forger,27,Female

describe("Untestable-to-testable 3: CSV file parsing", () => {
  let testFilename = "people.test.csv";
  beforeEach(() => {
    let data = `Loid,Forger,,Male\nAnya,Forger,6,Female\nYor,Forger,27,Female`;
    writeFile(testFilename, data, (err) => {
      if (err) throw err;
      else {
        console.log("SUCCESS");
      }
    });
  });

  xit("todo", async () => {
    // TODO: write proper tests
    try {
      expect(await parsePeopleCsv(testFilename)).to.deep.equal([]);
    } catch (e) {}
  });

  it("Returns correct amount of persons", async () => {
    let data;
    try {
      data = await parsePeopleCsv(testFilename);
    } catch (err) {
      console.log(
        `FAILURE: DETAILS BELOW
        ${err}`
      );
    }
    let persons = data.length;
    expect(persons).to.equal(3);
  });

  afterEach(() => {
    try {
      unlink(testFilename);
    } catch (err) {
      console.log(err);
    }
  });
});
