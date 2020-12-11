import Cell from './Cell.js'

export default class Board {
    constructor() {
        this.cells = []
        this.cellsAmount = [1, 2, 3]
        this.lastCellId = 0
    }
    createCell(row, column) {
        this.lastCellId++
        let newCell = new Cell(row, column, this.lastCellId)
        this.cells.push(newCell)
        return newCell
    }

    createAllCells() {
        this.cellsAmount.forEach(row => {
            this.cellsAmount.forEach(column => {
                this.createCell(row, column)
            })
        })
    }

    clearAllCells() {
        this.cells.forEach(cell => cell.clearSign())
    }

    findCellById(id) {
        return this.cells.find(cell => cell.id === id)
    }

    checkCellsState(currentCell) {
        if (currentCell.row + currentCell.column === 4) {
            let diagonalCells = this.cells.filter(cell => cell.row + cell.column === 4 && cell.sign === currentCell.sign)
            if (diagonalCells.length === 3) { return diagonalCells }
        }
        if (currentCell.row === currentCell.column) {
            let diagonalCells = this.cells.filter(cell => cell.row === cell.column && cell.sign === currentCell.sign)
            if (diagonalCells.length === 3) { return diagonalCells }
        }
        let rowCells = this.cells.filter(cell => cell.row === currentCell.row && cell.sign === currentCell.sign)
        if (rowCells.length === 3) { return rowCells }

        let columnCells = this.cells.filter(cell => cell.column === currentCell.column && cell.sign === currentCell.sign)
        if (columnCells.length === 3) { return columnCells }

        let allCells = this.cells.filter(cell => !cell.sign)
        if (allCells.length === 0) { return [] }

        return null
    }
}