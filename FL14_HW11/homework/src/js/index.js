
import Game from './Game.js'
import Board from './Board.js'
import renderNameAndScore from './renderNameAndScore.js'
import gameFlow from './gameFlow.js'
import clearBoard from './clearBoard.js'
import '../scss/main.scss'
import '../index.html'

console.log('0000')


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














