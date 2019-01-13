class StatsModel {
  constructor(stats, game, players) {
    const team2_id = stats.activePlayers.reduce(
      (accumulator, currentValue) => currentValue.teamId
    )
    this.home_team = stats.hTeam
    this.visitor_team = stats.vTeam
    this.team1 = stats.activePlayers.filter(key => {
      let id = parseInt(key.personId)
      key.name = players[id] !== undefined ? players[id].name : null
      return key.teamId != team2_id
    })
    this.team2 = stats.activePlayers.filter(key => {
      let id = parseInt(key.personId)
      key.name = players[id] !== undefined ? players[id].name : null
      return key.teamId == team2_id
    })
    this.playerOfTheGame = game.playerOfTheGame
      ? stats.activePlayers.find(p => p.personId == game.playerOfTheGame.id)
      : null
    this.playerOfTheGame = null
    if (game.playerOfTheGame) {
      const match = stats.activePlayers.find(
        p => p.personId == game.playerOfTheGame.id
      )
      if (match) {
        this.playerOfTheGame = match
        this.playerOfTheGame.city = game.playerOfTheGame.city
      }
    }
  }
}

export default StatsModel
