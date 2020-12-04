let randomOpponentMove = () => {

    let move = Math.floor(Math.random() * 3)
    switch (move) {
        case 0: { return paper }
            break
        case 1: { return rock }
            break
        case 2: { return scissors }
            break
        default: { return null }
    }
}