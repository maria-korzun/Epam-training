export default class Cell {
    constructor(row, column, id) {
        this.id = id
        this.row = row
        this.column = column
        this.sign = null
    }

    setSign(sign) {
        this.sign = sign
        return this.sign
    }

    clearSign() {
        this.sign = null
    }
}