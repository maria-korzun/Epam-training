import renderNameAndScore from './renderNameAndScore.js'

export default function renderResult(game, gameState, cellButtonsArray) {
    if (Array.isArray(gameState) && gameState.length === 3) {

        gameState.forEach(cell => {
            let cellButton = cellButtonsArray.find(cellButton => parseInt(cellButton.id) === cell.id)
            let cellButtonChildren = Array.from(cellButton.children)
            let highlightedCell = cellButtonChildren.find(element => element.className === 'highlighted_cell')
            highlightedCell.classList.add('highlighted_bg')
        })
        game.currentPlayer.incrementScore()
        renderNameAndScore(game)
        setTimeout(function () {
            window.alert(`${game.currentPlayer.name} won!`)
        }, 50);

    } else if (Array.isArray(gameState) && gameState.length === 0) {
        game.clearScoreAllPlayers()
        renderNameAndScore(game)
        setTimeout(function () {
            window.alert(`Draw!`)
        }, 50)

    }
}