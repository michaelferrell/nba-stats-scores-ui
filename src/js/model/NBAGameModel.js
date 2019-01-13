import { MONTH_NAMES, DAY_NAMES, TIME_CONVERSION } from "./../constants/"
import { formatDate } from "./../helpers/formatDate"
import { formatTVNetworks } from "./../helpers/formatTVNetworks"
import { formatClock } from "./../helpers/formatClock"
import { formatPeriod } from "./../helpers/formatPeriod"

class NBAGameModel {
  constructor(game, activeGame = false) {
    const home = game.h
    const vistor = game.v
    this.rawData = game
    this.game_id = game.gid
    this.activeGame = activeGame || {}
    this.status = this.setStatus(game)
    this.tv = formatTVNetworks(game.bd.b)
    this.date = formatDate(game.etm)
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
    this.score = null
    if (game.stt === "Final") {
      this.score = {
        home_team: parseInt(home.s),
        visitor_team: parseInt(vistor.s)
      }
    }
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
  }

  setStatus(game) {
    if (game.stt === "Final") {
      return "final"
    } else if (this.activeGame.isGameActivated) {
      return "active"
    } else if (new Date(game.etm) > new Date()) {
      return "upcoming"
    }
  }
}

export default NBAGameModel
