import { MONTH_NAMES, DAY_NAMES } from "./../constants/"
import { formatDate } from "./../helpers/formatDate"
import { formatTime } from "./../helpers/formatTime"
import { formatTVNetworks } from "./../helpers/formatTVNetworks"
import { formatClock } from "./../helpers/formatClock"
import { formatPeriod } from "./../helpers/formatPeriod"

class NBAGameModel {
  constructor(game, activeGame = false, playoffGame = false) {
    const home = game.h
    const vistor = game.v
    this.rawData = game
    this.game_id = game.gid
    this.activeGame = activeGame || {}
    this.status = this.setStatus(game)
    this.tv = formatTVNetworks(game.bd.b)
    this.date = formatDate(game.etm)
    this.time = formatTime(game.etm)
    // make sure all team ids are of type number
    this.home_team = {
      id: parseInt(home.tid),
      record: home.re,
      city: home.tc,
      name: home.tn
    }
    this.visitor_team = {
      id: parseInt(vistor.tid),
      record: vistor.re,
      city: vistor.tc,
      name: vistor.tn
    }
    this.score = this.setScore(game, activeGame)
    this.game_code = game.gcode.split("/")[0]
    this.playerOfTheGame = null
    if (game.ptsls && game.ptsls.pl.length > 0) {
      const player = game.ptsls.pl[0]
      this.playerOfTheGame = {
        id: player.pid,
        name: player.fn + " " + player.ln,
        city: player.tc,
        city_abbr: player.ta
      }
    }
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

    // playoff game data
    this.playoffs = false
    if (playoffGame) {
      let playoffs = playoffGame.playoffs
      this.playoffs = {
        roundNum: playoffs.roundNum,
        gameNum: playoffs.gameNumInSeries,
        home_team: playoffs.hTeam,
        visitor_team: playoffs.vTeam
      }
    }
 }

  setScore(game, activeGame) {
    let score = null
    if (game.stt === "Final") {
      score = {
        home_team: parseInt(game.h.s),
        visitor_team: parseInt(game.v.s)
      }
    } else if (
      activeGame &&
      !activeGame.isGameActivated &&
      activeGame.clock === ""
    ) {
      // sometimes the nba api is slow to update the game,
      // check if game is final here
      score = {
        home_team: activeGame.hTeam.score,
        visitor_team: activeGame.vTeam.score
      }
    }
    return score
  }

  setStatus(game) {
    let today = new Date()
    if (
      game.stt === "Final" ||
      today.getDate() > new Date(game.etm).getDate()
    ) {
      return "final"
    } else if (this.activeGame.isGameActivated) {
      return "active"
    } else if (new Date(game.etm) > today) {
      return "upcoming"
    }
  }
}

export default NBAGameModel
