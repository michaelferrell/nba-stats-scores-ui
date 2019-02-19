import { getTomorrowsDate } from "./getTomorrowsDate"
import { formatDate } from "./formatDate"
import { formatGameCode } from "./formatGameCode"

export const getDatesInRange = (daysAhead = 1, startDate) => {
  let tomorrow = getTomorrowsDate(startDate)
  let datesArr = [startDate, tomorrow]
  for (let i = 1; i < daysAhead; i++) {
    tomorrow = getTomorrowsDate(tomorrow)
    datesArr.push(tomorrow)
  }
  return datesArr.map(d => formatGameCode(formatDate(d)))
}
