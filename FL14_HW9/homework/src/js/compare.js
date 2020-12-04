let compare = (myMove, opponentMove) => {
    if (myMove === opponentMove) { return [0, 0] }
    let result = rules.find(rule => rule[0] === myMove && rule[1] === opponentMove)
    return result ? [1, 0] : [0, 1]
}