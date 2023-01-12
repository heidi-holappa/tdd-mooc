import { ShuffleBag } from "../src/ShuffleBag.mjs"
import { ArikaTetromino } from "../src/ArikaTetromino.mjs"
import { expect } from "chai";

describe("ShuffleBack...", () => {
    
    it("is empty when created", () => {
        shuffleBag = new ShuffleBag()
        expect(shuffleBag.items.length).to.equal(0)
    });
    
    xit("has a set amount of tetrominoes", () => {
        let tetrominoes = {
            10: ArikaTetromino.T_SHAPE,
            5: ArikaTetromino.O_SHAPE,
            2: ArikaTetromino.I_SHAPE,
        }


    });
})