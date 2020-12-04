let renderRoundMessage = (result, myMove, opponentMove) => {
    if (result[0] === 1) { return `Round ${countRound}, ${myMove} vs. ${opponentMove}, You’ve WON!` }
    else if (result[1] === 1) { return `Round ${countRound}, ${myMove} vs. ${opponentMove}, You’ve LOST!` }
    else { return `Round ${countRound}, ${myMove} vs. ${opponentMove}, DEAD HEAT!` }
}