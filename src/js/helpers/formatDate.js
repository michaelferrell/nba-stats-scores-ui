import { formatTime } from "./formatTime"
import { DAY_NAMES, MONTH_NAMES } from "./../constants/"

export const formatDate = date_str => {
  const date = new Date(date_str)
  const shortened = date.getMonth() + 1 + "/" + date.getDate()
  const day = DAY_NAMES[date.getDay()]
  const month = date.getMonth()
  const time = formatTime(date_str)
  return {
    date: date.getDate(),
    month: MONTH_NAMES[month],
    month_abbr: MONTH_NAMES[month].substring(0, 3),
    month_index: month,
    month_number: month + 1,
    year: date.getFullYear(),
    day_abbr: day.substring(0, 3),
    shortened: shortened,
    day,
    time
  }
}
