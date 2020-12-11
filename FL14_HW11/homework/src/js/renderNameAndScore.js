export default function renderNameAndScore(game) {
    let playerOneMessage = document.getElementById('message_player_one')
    playerOneMessage.textContent = `${game.players[0].name} score:${game.players[0].score}`
    let playerTwoMessage = document.getElementById('message_player_two')
    playerTwoMessage.textContent = `${game.players[1].name} score:${game.players[1].score}`
}