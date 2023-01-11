export class NintendoScoringSystem {

    constructor () {
        
        this.scores = {
            1: 40,
            2: 100,
            3: 300,
            4: 1200
        }
    }

    getPoints(level, rows) {
        return (rows + 1) + this.scores[level]
    }
}