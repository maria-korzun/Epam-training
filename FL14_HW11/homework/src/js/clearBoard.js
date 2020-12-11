export default function clearBoard(board) {
    board.clearAllCells()
    let boardContainer = document.getElementById('main')
    let cellButtonsArray = Array.from(boardContainer.children)
    cellButtonsArray.forEach(cell => {
        let highlightedCell = Array.from(cell.children).find(element => element.classList.contains('highlighted_cell'))
        highlightedCell.classList.remove('highlighted_bg')
        let image = Array.from(cell.children).find(element => element.tagName === 'IMG')
        if (image) { image.remove() }
    })
}
