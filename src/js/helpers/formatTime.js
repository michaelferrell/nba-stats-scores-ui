import { getHours, getMinutes } from "date-fns"

export const formatTime = date_str => {
  let d = date_str.split(/[- T :]/)
  // year, month, date, hours, minutes, seconds
  let date = new Date(d[0], parseInt(d[1]) - 1, d[2], d[3], d[4])
  // subtract 3 hours
  date = new Date(date.getTime() - 10800000)
  return date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
}