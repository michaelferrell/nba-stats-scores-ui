import { getHours, getMinutes } from "date-fns"

import { TIME_CONVERSION } from "./../constants/"

export const formatTime = date_str => {
  const date = new Date(date_str)
  let minutes = getMinutes(date)
  minutes = (minutes < 10 ? "0" : "") + minutes
  const east_time_diff = 3
  let hours = getHours(date) - east_time_diff
  const time_period = hours >= 12 ? "pm" : "am"
  hours = hours > 12 ? TIME_CONVERSION[hours] : hours
  return hours + ":" + minutes + " " + time_period
}