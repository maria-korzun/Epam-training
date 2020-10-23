function isEquals(left, right) {
    return left === right
}


function numberToString(number) {
    return `${number}`
}


function storeNames(...array) {
    return array
}


function getDivision(a, b) {
    return a >= b ? a / b : b / a
}


function negativeCount(array) {
    return array.filter(item => item < 0).length
}


function letterCount(firstString, secondString) {
    let count = 0
    let position = 0
    return letterCountInSubstring(firstString, secondString, position, count)
}

const noMatches = -1
function letterCountInSubstring(string1, string2, position, count) {
    let newPosition = string1.indexOf(string2, position)
    if (newPosition === noMatches) {
        return count
    }
    return letterCountInSubstring(string1, string2, ++newPosition, ++count)
}


const xWin = 3
const standOff = 1
function countPoints(array) {
    return array.reduce((count, item) => {
        let arrayXY = item.split(':')
        let x = parseInt(arrayXY[0])
        let y = parseInt(arrayXY[1])
        if (x > y) {
            return count + xWin
        }else if (x === y) {
            return count + standOff
        }
        return count
    }, 0)
}