// Pointsystem here.
export class NintendoScoringSystem {
    constructor() {
        this.lines = {
            1: 40,
            2: 100,
            3: 300,
            4: 1200
        }
    }

    getPoints(level, lines) {
        return this.lines[lines] * (level + 1)
    }
}