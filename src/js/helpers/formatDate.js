import { DAY_NAMES, MONTH_NAMES, TIME_CONVERSION } from "./../constants/"

export const formatDate = date_str => {
  const date = new Date(date_str)
  const minutes = (date.getMinutes() < 10 ? "0" : "") + date.getMinutes()
  const east_time_diff = 3
  let hours = date.getHours() - east_time_diff
  hours = hours > 12 ? TIME_CONVERSION[hours] : hours
  const time_period = date.getHours() >= 12 ? "pm" : "am"
  const time = hours + ":" + minutes + " " + time_period
  const shortened = date.getMonth() + 1 + "/" + date.getDate()
  const day = DAY_NAMES[date.getDay()]
  const month = date.getMonth()
  return {
    date: date.getDate(),
    month: MONTH_NAMES[month],
    month_abbr: MONTH_NAMES[month].substring(0, 3),
    month_index: month,
    month_number: month + 1,
    year: date.getFullYear(),
    day: day,
    day_abbr: day.substring(0, 3),
    time_raw: time,
    time: time,
    shortened: shortened
  }
}
