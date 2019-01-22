import { TEAMS } from "./../constants/"
import { formatDate } from "./../helpers/formatDate"
import { formatGameCode } from "./../helpers/formatGameCode"
import { formatClock } from "./../helpers/formatClock"
import { formatPeriod } from "./../helpers/formatPeriod"

class TeamScheduleModel {
  constructor(game, activeGame = false) {
    let home = game.hTeam
    let visitor = game.vTeam
    // make sure all team ids are of type number
    home.teamId = parseInt(home.teamId)
    visitor.teamId = parseInt(visitor.teamId)
    this.game_id = game.gameId
    this.date = formatDate(game.startTimeUTC)
    // time is already in utc, just call toLocaleTimeString()
    this.time = new Date(game.startTimeUTC).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit"
    })
    this.activeGame = activeGame || {}
    this.status = this.setStatus(game)
    this.home_team = {}
    if (TEAMS[home.teamId] !== undefined) {
      this.home_team = {
        id: home.teamId,
        city: TEAMS[home.teamId].city,
        name: TEAMS[home.teamId].name
      }
    }
    this.visitor_team = {}
    if (TEAMS[visitor.teamId] !== undefined) {
      this.visitor_team = {
        id: visitor.teamId,
        city: TEAMS[visitor.teamId].city,
        name: TEAMS[visitor.teamId].name
      }
    }
    this.score = null
    if (home.score && visitor.score) {
      this.score = {
        home_team: parseInt(home.score),
        visitor_team: parseInt(visitor.score)
      }
    }
    this.tv = null
    this.game_code = formatGameCode(this.date)
    // game is in progress
    if (this.status === "active") {
      this.clock = formatClock(activeGame.clock)
      this.period = formatPeriod(activeGame.period.current)
      this.is_halftime = activeGame.period.isHalftime
      this.is_end_of_period = activeGame.period.isEndOfPeriod
      this.score = {
        home_team: parseInt(activeGame.hTeam.score),
        visitor_team: parseInt(activeGame.vTeam.score)
      }
    }
  }

  setStatus(game) {
    if (game.hTeam.score.length > 0) {
      return "final"
    } else if (this.activeGame.isGameActivated) {
      return "active"
    } else if (new Date(game.startTimeUTC) > new Date()) {
      return "upcoming"
    }
  }
}

export default TeamScheduleModel
