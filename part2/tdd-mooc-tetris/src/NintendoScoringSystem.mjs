// Pointsystem here.
export class NintendoScoringSystem {
    constructor() {
        this.lines = {
            1: 40,
        }
    }

    getPoints(level, lines) {
        return this.lines[lines] * (level + 1)
    }
}