const suitArray = ['Hearts', 'Diamonds', 'Clubs', 'Spades']
const rankObject =
{
    1: 'Ace',
    2: '2',
    3: '3',
    4: '4',
    5: '5',
    6: '6',
    7: '7',
    8: '8',
    9: '9',
    10: '10',
    11: 'Jack',
    12: 'Queen',
    13: 'King'
}
const randomCoeficient = 0.5
const maxNumberedCard = 10



class Deck {
    constructor() {
        this.cards = []
        suitArray.forEach(suit => {
            Object.keys(rankObject).forEach(rank => {
                this.cards.push(new Card(suit, parseInt(rank)))
            })
        })


    }
    get count() {
        return this.cards.length
    }
    shuffle() {
        this.cards.sort(() => {
            return Math.random() - randomCoeficient
        })
    }
    drawn(n) {
        return this.cards.splice(-n)
    }
}



class Card {
    constructor(suit, rank) {
        this.suit = suit
        this.rank = rank
    }
    get isFaceCard() {
        return this.rank === 1 || this.rank > maxNumberedCard
    }

    toString() {
        return `${rankObject[this.rank]} of ${this.suit}`
    }
    static compare(cardOne, cardTwo) {
        if (cardOne.rank > cardTwo.rank) {
            return [1, 0]
        }
        if (cardOne.rank < cardTwo.rank) {
            return [0, 1]
        }
        return [0, 0]
    }
}





class Player {
    constructor(name, deck) {
        this.name = name
        this.deck = deck
        this._winsCounter = 0
    }
    get wins() {
        return this._winsCounter
    }

    static Play(playerOne, playerTwo) {
        playerOne.deck.shuffle()
        playerTwo.deck.shuffle()

        while (playerOne.deck.cards.length > 0) {
            let cardOne = playerOne.deck.cards[playerOne.deck.cards.length - 1]
            let cardTwo = playerTwo.deck.cards[playerTwo.deck.cards.length - 1]

            let win = Card.compare(cardOne, cardTwo)

            playerOne._winsCounter += win[0]
            playerTwo._winsCounter += win[1]

            playerOne.deck.drawn(1)
            playerTwo.deck.drawn(1)
        }
        let winner
        let loser
        if (playerTwo.wins > playerOne.wins) {
            winner = playerTwo
            loser = playerOne
        } else if (playerTwo.wins < playerOne.wins) {
            winner = playerOne
            loser = playerTwo
        } else {
            return 'Standoff!'
        }
        return `${winner.name} wins ${winner.wins} to ${loser.wins}`
    }
}


class Employee {
    constructor(firstName, lastName, birthday, salary, position, department) {
        this.id = ++Employee.lastId
        this.firstName = firstName
        this.lastName = lastName
        this.birthday = birthday
        this.salary = salary
        this.position = position
        this.department = department
        Employee.list.push(this)

    }
    get age() {
        let presentDay = new Date()
        let dateOfBirthday = new Date(this.birthday)
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

    get fullName() {
        return `${this.firstName} ${this.lastName}`
        }

    static get EMPLOYEES() {
        return Employee.list
    }
    quit() {
        Employee.list.splice(Employee.list.indexOf(this), 1)
    }
    retire() {
        console.log('It was such a pleasure to work with you!')
        this.quit()
    }

    getFired() {
        console.log('Not a big deal!')
        this.quit()
    }

    changeDepartment(newDepartment) {
        this.department = newDepartment
    }
    changePosition(newPosition) {
        this.position = newPosition
    }
    changeSalary(newSalary) {
        this.salary = newSalary
    }

    _promote(object) {
        if (object.department) { 
            this.changeDepartment(object.department) 
        }
        if (object.position) { 
            this.changePosition(object.position) 
        }
        if (object.salary) { 
            this.changeSalary(object.salary) 
        }
    }

    getPromoted(benetits) {
        this._promote(benetits)
        console.log('Yoohooo')
    }

    getDemoted(punishment) {
        this._promote(punishment)
        console.log('Damn')
    }
}

Employee.list = []
Employee.lastId = 0


class Manager extends Employee {
    constructor(firstName, lastName, birthday, salary, department) {
        super(firstName, lastName, birthday, salary, 'manager', department)

    }
    get managedEmployees() {
        return Employee.EMPLOYEES.filter(employee => employee.department === this.department &&
             employee.position !== 'manager');
    }
}

class BlueCollarWorker extends Employee {
}


class HRManager extends Manager {
    constructor(firstName, lastName, birthday, salary) {
        super(firstName, lastName, birthday, salary, 'hr')
    }
}

class SalesManager extends Manager {
    constructor(firstName, lastName, birthday, salary) {
        super(firstName, lastName, birthday, salary, 'sales')
    }
}

function ManagerPro(manager) {
    manager.promoteManagedEmployees = (benetits) => {
        manager.managedEmployees.forEach(employee => {
            employee.getPromoted(benetits)

        })
    }
}