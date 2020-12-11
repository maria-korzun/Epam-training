
import Game from './Game'
import Board from './Board'
import renderNameAndScore from './renderNameAndScore'
import gameFlow from './gameFlow'
import clearBoard from './clearBoard.js'
import '../scss/main.scss'
import '../index.html'

let game = new Game()
game.startGame()
renderNameAndScore(game)

let board = new Board()
board.createAllCells()
gameFlow(board, game)
let newGame = document.getElementById('new_game')
newGame.onclick = () => {
    board.createAllCells()
    clearBoard(board)

}
let clearGame = document.getElementById('clear_game')
clearGame.onclick = () => {
    board.createAllCells()
    clearBoard(board)
    game.clearScoreAllPlayers()
    renderNameAndScore(game)
}














