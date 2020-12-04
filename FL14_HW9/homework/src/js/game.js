let game = (myMove) => {
    countRound++

    let opponentMove = randomOpponentMove()

    renderContainer(myContainer, renderMove(imgMoves[myMove.toLowerCase()]))

    renderContainer(opponentContainer, renderMove(imgMoves[opponentMove.toLowerCase()], 'opponent_img'))

    let result = compare(myMove, opponentMove)

    myScore += result[0]
    opponentScore += result[1]
    if (myScore === 3) {
        reset()
        scoreContainer.textContent = "Congratulations! You've won!"
        return
    }
    if (opponentScore === 3) {
        reset()
        scoreContainer.textContent = "Sorry, You've lost!"
        return
    }

    scoreContainer.textContent = renderRoundMessage(result, myMove, opponentMove)
}
