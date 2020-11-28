function maxElement(array) {
    return Math.max(...array)
}

function copyArray(array) {
    return [...array]
}

function addUniqueId(object) {
    let newObj = Object.assign({}, object)
    newObj.id = Symbol()
    return newObj
}

function regroupOject(object) {
    let {
        name,
        details: {
            id,
            age,
            university
        }
    } = object
    return {
        university,
        user: {
            id,
            age,
            firstName: name
        }
    }
}

function fundUniqueElements(array) {
    return Array.from(new Set(array))
}

function hideNumber(number) {
    let n = 4
    return number.slice(-n).padStart(number.length, '*')
}

function add(a = () => {
    throw new Error('Missing property')
}, b = () => {
    throw new Error('Missing property')
}) {
    if (a instanceof Error) {
        a()
    }
    if (b instanceof Error) {
        b()
    }
    return a + b
}


function userNamesPromises() {
    let server = new URL('https://jsonplaceholder.typicode.com/users')
    let statusOk = 200
    let negative = -1
    fetch(server.href, {
        method: 'GET'
    }).then(response => {
        if (response.status !== statusOk) {
            throw new Error('Something got broken')
        }
        return response.json()
    }).then(body => {
        body.sort((user1, user2) => {
            if (user1.name > user2.name) {
                return 1
            } else if (user1.name === user2.name) {
                return 0
            } else {
                return negative
            }
        })
        console.log(body.map(user => user.name))
    }).catch(error => {
        alert(error)
        console.log(error)
    })
}


async function userNamesAsyncAwait() {
    try {
        let statusOk = 200
        let negative = -1
        let server = new URL('https://jsonplaceholder.typicode.com/users')
        let response = await fetch(server.href, { method: 'GET' })
        if (response.status !== statusOk) {
            throw new Error('Something got broken')
        }
        let body = await response.json()
        body.sort((user1, user2) => {
            if (user1.name > user2.name) {
                return 1
            } else if (user1.name === user2.name) {
                return 0
            } else {
                return negative
            }
        })
        console.log(body.map(user => user.name))
    }catch (error) {
        alert(error)
        console.log(error)
    }
}