import NBAGameModel from "./../model/NBAGameModel"

const validDate = date_str => {
  let d = new Date(date_str)
  if (isNaN(d.getTime())) {
    return false
  } else {
    return true
  }
}

export const scheduleByMonth = (
  schedule,
  activeGames = {},
  playoffGames = {}
) => {
  let schedule_by_month = {}
  let playoffs = []
  for (let i = 0; i < schedule.length; i++) {
    playoffs = schedule[i].mscd.g.filter(game => game.seri != "")
    // filter out playoff
    let games_in_month = schedule[i].mscd.g
      .filter(game => validDate(game.etm))
      .map(game => {
        let activeGame = false
        let playoffGame = false
        // if activeGames object has this game.id, then add the active game to the model
        if (activeGames[game.gid]) {
          activeGame = activeGames[game.gid]
        }
        if (playoffGames[game.gid]) {
          playoffGame = playoffGames[game.gid]
        }
        return new NBAGameModel(game, activeGame, playoffGame)
      })
    let formatted = {
      month: schedule[i].mscd.mon,
      games: games_in_month
    }
    if (schedule_by_month[formatted.month] === undefined) {
      schedule_by_month[formatted.month] = formatted.games
    }
  }
  return { regular: schedule_by_month, playoffs }
}
