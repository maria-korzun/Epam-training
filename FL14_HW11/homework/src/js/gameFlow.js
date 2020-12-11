import renderResult from './renderResult.js'
import renderCellSign from './renderCellSign.js'

export default function gameFlow(board, game) {
    let boardContainer = document.getElementById('main')
    let cellButtons = boardContainer.children
    let cellButtonsArray = Array.from(cellButtons)
    for (let i = 0; i < cellButtons.length; i++) {
        let id = board.cells[i].id
        cellButtons[i].id = id
        cellButtons[i].onclick = function () {
            let cell = board.findCellById(parseInt(this.id))
            if (cell.sign) { return }
            let sign = game.currentPlayer.sign
            cell.setSign(sign)
            renderCellSign(this, cell)
            let gameState = board.checkCellsState(cell)
            setTimeout(() => { renderResult(game, gameState, cellButtonsArray) }, 30)
            game.setCurrentPlayer()
        }
    }
}