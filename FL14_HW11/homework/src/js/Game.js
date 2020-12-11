import Player from './Player.js'
import {sign} from './data.js'

export default class Game {
    constructor() {
        this.currentPlayer = null
        this.players = []
    }
    createPlayer(name) {
        let newPlayers = new Player(name)
        if (this.players.length === 0) { newPlayers.sign = sign[0] }
        else { newPlayers.sign = sign[1] }
        this.players.push(newPlayers)
        return newPlayers
    }

    clearScoreAllPlayers() {
        this.players.forEach(player => player.clearScore())
    }

    setCurrentPlayer() {
        let currentPlayer
        if (this.currentPlayer) {
            currentPlayer = this.players.find(item => item !== this.currentPlayer)

        } else {
            let randomIndex = Math.floor(Math.random() * 2)
            currentPlayer = this.players[randomIndex]
        }

        this.currentPlayer = currentPlayer
        return this.currentPlayer
    }
    startGame() {
        let playerOneName = prompt('Insert name of first player')
        let playerTwoName = prompt('Insert name of second player')
        this.createPlayer(playerOneName)
        this.createPlayer(playerTwoName)
        this.setCurrentPlayer()
    }

}