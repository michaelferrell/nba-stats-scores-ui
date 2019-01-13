import { formatDate } from "./formatDate"
import { formatGameCode } from "./formatGameCode"
import { MONTH_NAMES } from "./../constants/"

export const scheduleByDate = (schedule, filtered, targetDate) => {
  const monthName = MONTH_NAMES[targetDate.getMonth()]
  schedule[monthName].map(game => {
    // always compare gcode (ex. 20181112 aka 2018-11-12)
    if (game.game_code == formatGameCode(formatDate(targetDate))) {
      if (filtered[game.game_code] === undefined) {
        filtered[game.game_code] = { games: [], date: game.date }
      }
      filtered[game.game_code].games.push(game)
    }
  })
  return filtered
}
