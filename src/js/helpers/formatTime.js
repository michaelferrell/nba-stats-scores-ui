import { getHours, getMinutes } from "date-fns"

import { TIME_CONVERSION } from "./../constants/"

export const formatTime = date_str => {
  let date
  // this method is used in multiple scenarios
  // string when called be NBAGameModel
  // object in other places
  // future fix: normalize dates
  if (typeof date_str === "string") {
    let d = date_str.split(/[- T :]/)
    date = new Date(d[0], parseInt(d[1]) - 1, d[2], d[3], d[4], d[5])
  } else if (typeof date_str === "object") {
    date = new Date(date_str)
  }
  let minutes = getMinutes(date)
  minutes = (minutes < 10 ? "0" : "") + minutes
  const east_time_diff = 3
  let hours = getHours(date) - east_time_diff
  const time_period = hours >= 12 ? "pm" : "am"
  hours = hours > 12 ? TIME_CONVERSION[hours] : hours
  return hours + ":" + minutes + " " + time_period
}