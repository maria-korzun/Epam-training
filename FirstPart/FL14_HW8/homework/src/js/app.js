const amountOfOptions = 4
let localStorageQuestions
let currentquestion
let totalPrize
let currentPrize
const winPrize = 1000000
const multiplier = 2
const initialCurrentlPrize = 100



function startGame() {
    totalPrize = 0
    currentPrize = initialCurrentlPrize
    localStorageQuestions = JSON.parse(localStorage.getItem('questions'));
    hideElement(false)
    document.getElementById('game_over_div').style.display = 'none';
    document.getElementById('game_win_div').style.display = 'none';
    appearQuestion()
}


function appearQuestion() {
    let indexOfCurrentquestion = Math.floor(Math.random() * localStorageQuestions.length)
    currentquestion = localStorageQuestions[indexOfCurrentquestion]
    localStorageQuestions.splice(indexOfCurrentquestion, 1)
    document.getElementById('question').textContent = currentquestion.question
    for (let i = 0; i < amountOfOptions; i++) {
        document.getElementById(`option${i}`).textContent = currentquestion.content[i];
    }
    document.getElementById('total_prize').textContent = totalPrize;
    document.getElementById('current_prize').textContent = currentPrize;
}
function checkOption(indexOfOption) {
    if (indexOfOption !== currentquestion.correct) {
        hideElement(true)
        document.getElementById('game_over_div').style.display = 'block';
        document.getElementById('game_over').textContent = totalPrize;
        return
    }
    totalPrize += currentPrize
    if (totalPrize >= winPrize) {
        hideElement(true)
        document.getElementById('game_win_div').style.display = 'block';
        return
    }
    currentPrize *= multiplier
    appearQuestion()
}

function skipQuestion() {
    document.getElementById('skip').style.display = 'none';
    appearQuestion()
}

function hideElement(hide) {
    document.getElementById('skip').style.display = hide ? 'none' : 'inline'
    document.getElementById('question').style.display = hide ? 'none' : 'block'
    for (let i = 0; i < amountOfOptions; i++) {
        document.getElementById(`option${i}`).style.display = hide ? 'none' : 'inline'
    }
    document.getElementById('total_prize_div').style.display = hide ? 'none' : 'block'
    document.getElementById('current_prize_div').style.display = hide ? 'none' : 'block'
}