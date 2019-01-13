import NBAGameModel from "./../model/NBAGameModel"

export const scheduleByMonth = (schedule, activeGames = {}) => {
  let schedule_by_month = {}
  for (let i = 0; i < schedule.length; i++) {
    let games_in_month = schedule[i].mscd.g.map(game => {
      let activeGame = false
      // if activeGames object has this game.id, then add the active game to the model
      if (activeGames[game.gid]) {
        activeGame = activeGames[game.gid]
      }
      return new NBAGameModel(game, activeGame)
    })
    let formatted = {
      month: schedule[i].mscd.mon,
      games: games_in_month
    }
    if (schedule_by_month[formatted.month] === undefined) {
      schedule_by_month[formatted.month] = formatted.games
    }
  }
  return schedule_by_month
}
