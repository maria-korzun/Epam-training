function calculator() {
    try {
        let expression = prompt()
        if (!expression) {
            throw Error('Invalid input data. Please try again.')
        }
        let result = eval(expression)
        if (isNaN(result) || result == Infinity ||
            result == +Infinity || result == -Infinity ||
            typeof result !== 'number') {
            throw Error('Invalid input data. Please try again.')
        }
        alert(result)
    }
    catch (error) {
        if (error.name === 'ReferenceError' || error.name === 'SyntaxError') {
            error = Error('Please, enter mathmatical expresion.')
        }
        alert(error.message)
    }
}

window.onload = () => {
    document.getElementById('calculateButton').onclick = calculator
}