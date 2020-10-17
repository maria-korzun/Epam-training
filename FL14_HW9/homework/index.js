//task1
function convert() {
    let resultArray = [];
    for (let i = 0; i < arguments.length; i++) {
        if (typeof arguments[i] === 'string') {
            resultArray.push(parseInt(arguments[i]))
        } else {
            resultArray.push(`${arguments[i]}`)
        }
    }
    return resultArray
}


//task2
function executeforEach(array, func) {
    for (let i = 0; i < array.length; i++) {
        func(array[i])
    }
}


//task3
function mapArray(array, func) {
    let newArray = []
    executeforEach(array, function (element) {
        let number = typeof element === 'string' ? parseInt(element) : element
        newArray.push(func(number))
    })
    return newArray
}


//task4
function filterArray(array, func) {
    let newArray = []
    executeforEach(array, function (element) {
        if (func(element)) {
            newArray.push(element)
        }
    })
    return newArray
}


//task5
function getValuePosition(array, value) {
    for (let i = 0; i < array.length; i++) {
        if (array[i] === value) {
            return i + 1
        }
    }
    return false
}


//task6
function flipOver(string) {
    let newString = ''
    for (let i = 0; i < string.length; i++) {
        newString += string[string.length - i - 1]
    }
    return newString
}


//task7
function makeListFromRange(range) {
    let array = []
    let rangeLenght = range[1] - range[0]
    array[0] = range[0]
    for (let i = 0; i < Math.abs(rangeLenght); i++) {
        array.push(array[i] + rangeLenght / Math.abs(rangeLenght))
    }
    return array
}


//task8
function getArrayOfKeys(array, key) {
    let arrayOfValues = []
    executeforEach(array, function (element) {
        arrayOfValues.push(element[key])
    })
    return arrayOfValues
}


//task9
function getTotalWeight(array) {
    let totalWeight = 0
    executeforEach(array, function (element) {
        totalWeight += element.weight
    })
    return totalWeight
}


//task10
function getPastDay(date, days) {
    const newDate = new Date(date)
    newDate.setDate(date.getDate() - days)
    return newDate.getDate()
}


//task11
const numberMinLenght = 2
function formatDate(date) {
    let years = date.getFullYear()
    let months = numberFormat(date.getMonth() + 1, numberMinLenght)
    let days = numberFormat(date.getDate(), numberMinLenght)
    let hours = numberFormat(date.getHours(), numberMinLenght)
    let minutes = numberFormat(date.getMinutes(), numberMinLenght)
    let dateString = `${years}/${months}/${days} ${hours}:${minutes}`
    return dateString
}

//function for formating of number '5'->'05'
function numberFormat(number, lenght) {
    let numberString = `${number}`
    if (numberString.length < lenght) {
        let amountOfZero = lenght - numberString.length
        for (let i = 0; i < amountOfZero; i++) {
            numberString = '0' + numberString
        }
    }
    return numberString
}
