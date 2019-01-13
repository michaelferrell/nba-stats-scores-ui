export const formatActiveGames = games => {
  let formatted = {}
  games.map(game => {
    if (formatted[game.gameId] === undefined) {
      formatted[game.gameId] = game
    }
  })
  return formatted
}
