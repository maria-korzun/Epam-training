const monthArray = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const weekArray = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']



function getAge(dateOfBirthday) {
    let presentDay = new Date()
    let age = presentDay.getFullYear() - dateOfBirthday.getFullYear()
    let monthOfBD = dateOfBirthday.getMonth()
    let dateOfBD = dateOfBirthday.getDate()
    let currentMonth = presentDay.getMonth()
    let currentDate = presentDay.getDate()

    if (monthOfBD > currentMonth ||
        monthOfBD === currentMonth && dateOfBD > currentDate) {
        age--
    }
    return age
}


function getWeekDay(date) {
    if (typeof date === 'number') {
        date = new Date(date)
    }
    return weekArray[date.getDay()]
}


function getProgrammersDay(year) {
    let amountOfDay = 256
    let dateObject = new Date(year, 0, amountOfDay, 0, 0, 0, 0)
    let weekDay = getWeekDay(dateObject)
    let date = dateObject.getDate()
    let month = monthArray[dateObject.getMonth()]
    let programmerDay = `${date} ${month}, ${year} (${weekDay})`
    return programmerDay
}

function howFarIs(day) {
    day = day[0].toUpperCase() + day.slice(1).toLowerCase()
    let indexOfDay = weekArray.indexOf(day)
    let currentDay = new Date().getDay()
    if (indexOfDay === currentDay) {
        return `Hey, today is ${day} =)`
    }
    let delta = indexOfDay - currentDay
    let result = delta > 0 ? delta : weekArray.length + delta
    return `It's ${result} day(s) left till ${day}.`
}


function isValidIdentifier(string) {
    let regExp = /^[a-z_$]{1}[\w|$]*$/i
    return regExp.test(string)
}

function capitalize(string) {
    let regExp = /\w+/ig
    let array = string.match(regExp)
    let upperCasedArray = array.map(element => {
        return element[0].toUpperCase() + element.slice(1)
    })
    upperCasedArray.forEach(element => {
        let reg = new RegExp(`\\b${element}`, 'ig')
        string = string.replace(reg, element)
    })
    return string
}



function isValidAudioFile(string) {
    let regExp = /^[a-z]+\.(mp3|flac|alac|aac)$/i
    return regExp.test(string)
}



function getHexadecimalColors(string) {
    let regExp = /#([a-f0-9]{3}|[a-f0-9]{6})\b/ig
    let matchArray = string.match(regExp) || []
    return matchArray
}


function isValidPassword(string) {
    let regExp = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])).{8,}/
    return regExp.test(string)
}

function addThousandsSeparators(value) {
    if (typeof value === 'number') {
        value = `${value}`
    }
    let regExp = /(\d)(?=(\d{3})+(?!\d))/g;
    let separator = '$&,';
    return value.replace(regExp, separator)
}