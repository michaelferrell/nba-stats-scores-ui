import { getYesterdaysDate } from "./getYesterdaysDate"
import { getTomorrowsDate } from "./getTomorrowsDate"
import { formatGameCode } from "./formatGameCode"
import { formatDate } from "./formatDate"

export const displayGameDate = gameDate => {
  const date = new Date()
  const gameCode = formatGameCode(gameDate)
  if (gameCode === formatGameCode(formatDate(date))) {
    return "Today"
  } else if (gameCode === formatGameCode(formatDate(getYesterdaysDate(date)))) {
    return "Yesterday"
  } else if (gameCode === formatGameCode(formatDate(getTomorrowsDate(date)))) {
    return "Tomorrow"
  } else {
    return (
      gameDate.day.substring(0, 3) +
      " " +
      gameDate.month_number +
      "/" +
      gameDate.date
    )
  }
}
