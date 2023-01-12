import { ShuffleBag } from "../src/ShuffleBag.mjs"
import { ArikaTetromino } from "../src/ArikaTetromino.mjs"
import { expect } from "chai";


describe("A shuffleBack", () => {
    let shuffleBagOne;
    let shuffleBagTwo;
    let tetrominoesBagOne;
    let tetrominoesBagTwo;
    beforeEach(() => {
        shuffleBagOne = new ShuffleBag()
        tetrominoesBagOne = [
            [10, ArikaTetromino.T_SHAPE],
            [5, ArikaTetromino.O_SHAPE],
            [2, ArikaTetromino.I_SHAPE],
        ]
        for (let i = 0; i < tetrominoesBagOne.length; i++) {
            shuffleBagOne.add(tetrominoesBagOne[i][1], tetrominoesBagOne[i][0])
        }
        shuffleBagTwo = new ShuffleBag()
        tetrominoesBagTwo = [
            [1, ArikaTetromino.T_SHAPE],
            [1, ArikaTetromino.O_SHAPE],
            [1, ArikaTetromino.I_SHAPE],
            [1, ArikaTetromino.L_SHAPE],
            [1, ArikaTetromino.L_SHAPE_INVERSE],
            [1, ArikaTetromino.Z_SHAPE],
            [1, ArikaTetromino.Z_SHAPE_INVERSE]
        ]
        for (let i = 0; i < tetrominoesBagTwo.length; i++) {
            shuffleBagTwo.add(tetrominoesBagTwo[i][1], tetrominoesBagTwo[i][0])
        }
    })

    it("is empty when created", () => {
        let shuffleBag2 = new ShuffleBag()        
        expect(shuffleBag2.itemCount()).to.equal(0)
    });
    
    it("has a set amount of tetrominoes", () => {
        expect(shuffleBagOne.itemCount()).to.equal(17)
    });

    it("gives out only object types that were placed in it", () => {
        let items = shuffleBagOne.itemCount()
        let isArikaTetromino = true
        for (let i = 0; i < items; i++) {
            let item = shuffleBagOne.getItem()
            isArikaTetromino = (item instanceof ArikaTetromino)
        }
        expect(isArikaTetromino).to.equal(true)
    })

    it("gives out the correct amount of each Tetromino shape", () => {
        let distinctShapes = new Set()
        let items = shuffleBagOne.itemCount()
        for (let i = 0; i < items; i++) {
            let item = shuffleBagOne.getItem()
            distinctShapes.add(item.toString())
        }
        let distinctTetrominoes = Object.keys(tetrominoesBagOne).length
        expect(distinctShapes.size).to.equal(distinctTetrominoes)
    })

    it("returns tetrominoes in a shuffled order", () => {
        let tetrominoItems = []
        for (let key in tetrominoesBagTwo) {
            for (let i = 0; i < key; i++) {
                tetrominoItems.push(tetrominoesBagTwo[key])
            }
        }
        let orderRemainsSame = true
        let items = shuffleBagTwo.itemCount()
        for (let i = 0; i < items; i++) {
            let shuffleBagItem = shuffleBagTwo.getItem().toString()
            let tetrominoItem = tetrominoItems.pop().toString() 
            console.log(`
            SHAPES:
            Shufflebag item count: ${shuffleBagTwo.itemCount()}
            ${shuffleBagItem}
            ${tetrominoItem}
            `)
            orderRemainsSame = tetrominoItem === shuffleBagItem
        }
        expect(orderRemainsSame).to.equal(false)
    })

})