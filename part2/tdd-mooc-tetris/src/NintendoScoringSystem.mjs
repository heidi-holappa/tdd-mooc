export class NintendoScoringSystem {
    constructor() {
        this.linesAndPoints = {
            1: 40,
            2: 100,
            3: 300,
            4: 1200
        }
        this.level = 0
        this.points = 0
    }

    setPoints(lines) {
        this.points +=  this.linesAndPoints[lines] * (this.level + 1)
    }

    getPoints() {
        return this.points
    }


}