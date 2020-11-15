/* START TASK 1: Your code goes here */
let cellNumber = 3
for (let i = 0; i < cellNumber; i++) {
    for (let j = 0; j < cellNumber; j++) {
        document.getElementById(`${[i]}_${[j]}`).onclick = task1
    }
}

function task1() {
    if (this.textContent === 'Special Cell') {
        let cells = document.getElementsByClassName('first_bg_color')
        while (cells.length > 0) {
            cells[0].className = 'green'
        }
        return
    }
    if (this.id.split('_')[1] === '0') {
        let rowNumber = this.id.split('_')[0]
        for (let i = 0; i < cellNumber; i++) {
            let currentCell = document.getElementById(`${rowNumber}_${i}`)
            if (currentCell.className !== 'yellow') {
                currentCell.className = 'blue'
            }
        }
        return
    }
    this.className = 'yellow'
}
/* END TASK 1 */

/* START TASK 2: Your code goes here */

let inputTask2 = document.getElementById('data_input_task2')
let invalidData = document.getElementsByClassName('invalid_data_task2')[0]
let succsessfulData = document.getElementsByClassName('successful_data_task2')[0]
let button = document.getElementById('submit_button_task2')


inputTask2.oninput = (event) => {
    validate(event.target.value)
}
button.onclick = () => {
    succsessfulData.style.display = 'block'
}

function validate(userNumber) {
    let regExp = /^\+380\d{9}$/
    regExp.test(userNumber) ? succsessful_data() : invalid_data()
}

function invalid_data() {
    inputTask2.classList.add('input_task2_invalid')
    succsessfulData.style.display = 'none'
    invalidData.style.display = 'block'
    button.setAttribute('disabled', 'disabled')


}
function succsessful_data() {
    inputTask2.classList.remove('input_task2_invalid')
    invalidData.style.display = 'none'
    button.removeAttribute('disabled')
}

/* END TASK 2 */

/* START TASK 3: Your code goes here */
let court = document.getElementById('court')
let teamAScore = 0
let teamBScore = 0
let timeOut = 3000
let leftHoop = document.getElementById('left_hoop_id')
let rightHoop = document.getElementById('right_hoop_id')
let scoreBoardTeamA = document.getElementById('teamA')
let scoreBoardTeamB = document.getElementById('teamB')
let ball = document.getElementById('ball')
let ballCurrentX = ball.getBoundingClientRect().x - court.getBoundingClientRect().x
let ballCurrentY = ball.getBoundingClientRect().y - court.getBoundingClientRect().y
let task3Div = document.getElementById('task3')
let ballRadius = 20
let animationTime = 2000
let maxX = 560
let maxY = 290

task3Div.onclick = (event) => {
    if (event.target === leftHoop ||
        event.target === rightHoop) {
        return
    }
    moveBall(event)
}
leftHoop.onclick = (event) => {
    clickHoop(event, scoreBoardTeamB, 'B')
}
rightHoop.onclick = (event) => {
    clickHoop(event, scoreBoardTeamA, 'A')
}

function clickHoop(event, boardTeam, team) {
    moveBall(event, () => {
        goal(boardTeam, team)
    })

}



let oldBallPosition
let allowMoveFlag = true

function moveBall(event, resolve) {
    if (!allowMoveFlag) {
        return
    }

    if (event.target !== court && event.target !== ball.children[0] &&
        event.target !== rightHoop && event.target !== leftHoop) {
        alert('Click in the court')
        return
    }
    let ballX
    let ballY


    let courtPosition = court.getBoundingClientRect()
    let mouseX = event.clientX
    let mouseY = event.clientY
    ballX = mouseX - courtPosition.x - ballRadius
    ballY = mouseY - courtPosition.y - ballRadius


    if (ballX >= maxX) {
        ballX = maxX
    }
    if (ballY >= maxY) {
        ballY = maxY
    }
    if (ballX <= 0) {
        ballX = 0
    }
    if (ballY <= 0) {
        ballY = 0
    }



    ball.animate({
        left: [`${ballCurrentX}px`, `${ballX}px`],
        top: [`${ballCurrentY}px`, `${ballY}px`]
    }, animationTime);
    ball.style.left = `${ballX}px`
    ball.style.top = `${ballY}px`
    ballCurrentX = ballX
    ballCurrentY = ballY
    if (resolve) {
        setTimeout(() => {
            resolve()
        }, animationTime)
    }
}


function goal(scoreBoard, teamName) {

    let teamScore = teamName === 'A' ? ++teamAScore : ++teamBScore
    let goalMessage = document.getElementById('goal_message')
    goalMessage.textContent = `Team ${teamName} scored a goal`
    toggleDisplayElement(goalMessage)
    toggleDisplayElement(leftHoop)
    toggleDisplayElement(rightHoop)
    allowMoveFlag = false
    setTimeout(
        () => {
            toggleDisplayElement(goalMessage)
            toggleDisplayElement(leftHoop)
            toggleDisplayElement(rightHoop)
            allowMoveFlag = true
        }, timeOut)
    scoreBoard.textContent = `Team ${teamName}:${teamScore}`
}

function toggleDisplayElement(element) {
    element.classList.toggle('display')
}

/* END TASK 3 */
