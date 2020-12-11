export default class Player {
    constructor(name) {
        this.name = name
        this.score = 0
        this.sign = null
    }
    incrementScore() {
        this.score++
    }

    clearScore() {
        this.score = 0
    }
}

