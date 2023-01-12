import { ShuffleBag } from "../src/ShuffleBag.mjs"
import { ArikaTetromino } from "../src/ArikaTetromino.mjs"
import { expect } from "chai";


describe("A shuffleBack", () => {
    let shuffleBag;
    let tetrominoes;
    beforeEach(() => {
        shuffleBag = new ShuffleBag()
        tetrominoes = {
            10: ArikaTetromino.T_SHAPE,
            5: ArikaTetromino.O_SHAPE,
            2: ArikaTetromino.I_SHAPE,
        }
        for (let key in tetrominoes) {
            shuffleBag.add(tetrominoes[key], key)
        }
    })

    it("is empty when created", () => {
        let shuffleBag2 = new ShuffleBag()        
        expect(shuffleBag2.itemCount()).to.equal(0)
    });
    
    it("has a set amount of tetrominoes", () => {
        expect(shuffleBag.itemCount()).to.equal(17)
    });

    it("gives out only object types that were placed in it", () => {
        let items = shuffleBag.itemCount()
        let isArikaTetromino = true
        for (let i = 0; i < items; i++) {
            let item = shuffleBag.getItem()
            isArikaTetromino = (item instanceof ArikaTetromino)
        }
        expect(isArikaTetromino).to.equal(true)
    })

    it("gives out the correct amount of each Tetromino shape", () => {
        let distinctShapes = new Set()
        let items = shuffleBag.itemCount()
        for (let i = 0; i < items; i++) {
            let item = shuffleBag.getItem()
            distinctShapes.add(item.toString())
        }
        let distinctTetrominoes = Object.keys(tetrominoes).length
        expect(distinctShapes.size).to.equal(distinctTetrominoes)
    })

    it("returns tetrominoes in a shuffled order", () => {
        let tetrominoItems = []
        for (let key in tetrominoes) {
            for (let i = 0; i < key; i++) {
                tetrominoItems.push(tetrominoes[key])
            }
        }
        let orderRemainsSame = true
        let items = shuffleBag.itemCount()
        for (let i = 0; i < items; i++) {
            let shuffleBagItem = shuffleBag.getItem().toString()
            let tetrominoItem = tetrominoItems.pop().toString() 
            orderRemainsSame = tetrominoItem === shuffleBagItem
        }
        expect(orderRemainsSame).to.equal(false)
    })

})