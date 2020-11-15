const divisionRatio = 2
function task2() {
    const userString = prompt('Please enter a string')
    if (userString === '') {
        alert('Invalid value')
        return
    }
    let onlySpaces = true
    for (let i = 0; i <= userString.length - 1; i++) {
        if (userString[i] !== ' ') {
            onlySpaces = false
            break
        }
    }
    if (onlySpaces) {
        alert('Invalid value')
        return
    }
    const middleIndex = userString.length / divisionRatio
    if (userString.length % divisionRatio !== 0) {
        alert(`${userString[Math.floor(middleIndex)]}`)
        return
    }
    if (userString[middleIndex - 1] !== userString[middleIndex]) {
        alert(`${userString[middleIndex - 1]}` + `${userString[middleIndex]}`)
        return
    }
    alert('Middle characters are the same')
}


