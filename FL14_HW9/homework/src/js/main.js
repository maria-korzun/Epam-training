let countRound = 0
let opponentScore = 0
let myScore = 0
let rockButton = document.getElementById('rock_button')
let paperButton = document.getElementById('paper_button')
let scissorsButton = document.getElementById('scissors_button')
let resetButton = document.getElementById('reset')
let opponentContainer = document.getElementById('opponent')
let myContainer = document.getElementById('player')
let scoreContainer = document.getElementById('score_info')
const rock = 'Rock'
const paper = 'Paper'
const scissors = 'Scissors'
const rules = [[paper, rock], [scissors, paper], [rock, scissors]]
let imgMoves = {
    rock: './img-compressed/rock-hand.jpeg',
    scissors: './img-compressed/scissors-hand.jpeg',
    paper: './img-compressed/paper-hand.jpeg'
}


resetButton.onclick = () => { resetAll() }

rockButton.onclick = () => { game(rock) }
paperButton.onclick = () => { game(paper) }
scissorsButton.onclick = () => { game(scissors) }