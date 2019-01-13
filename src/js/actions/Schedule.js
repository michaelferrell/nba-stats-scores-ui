import Cabinet from "cabinet-storage"

import { formatActiveGames } from "./../helpers/formatActiveGames"
import { scheduleByMonth } from "./../helpers/scheduleByMonth"
import { scheduleByDate } from "./../helpers/scheduleByDate"
import { getYesterdaysDate } from "./../helpers/getYesterdaysDate"
import { getTomorrowsDate } from "./../helpers/getTomorrowsDate"
import { getDatesInRange } from "./../helpers/getDatesInRange"
import { formatDate } from "./../helpers/formatDate"
import { formatGameCode } from "./../helpers/formatGameCode"
import {
  ACTIVE_GAMES_URL,
  SCHEDULE_URL,
  NBA_LOCAL_STORAGE,
  MONTH_NAMES,
  DAYS_AHEAD
} from "./../constants/"

const fetchScheduleRequest = () => ({
  type: "FETCH_SCHEDULE_REQUEST"
})

const fetchScheduleSuccess = payload => ({
  type: "FETCH_SCHEDULE_SUCCESS",
  payload
})

const fetchScheduleError = payload => ({
  type: "FETCH_SCHEDULE_ERROR",
  payload
})

const filterScheduleSuccess = payload => ({
  type: "FILTER_SCHEDULE_SUCCESS",
  payload
})

// const fetchScheduleLocalDev = () => dispatch => {
//   dispatch(fetchScheduleRequest())

//   let schedule = Cabinet.get("schedule")
//   let activeGames = Cabinet.get("activeGames")
//   schedule = scheduleByMonth(schedule, activeGames)

//   let filtered = {}
//   const today = new Date()
//   const tomorrow = getTomorrowsDate(today)

//   schedule[MONTH_NAMES[today.getMonth()]].map(g => {
//     if (getDatesInRange(DAYS_AHEAD).indexOf(g.game_code) > -1) {
//       if (filtered[g.game_code] === undefined) {
//         filtered[g.game_code] = { games: [], date: g.date }
//       }
//       filtered[g.game_code].games.push(g)
//     }
//   })
//   dispatch(
//     fetchScheduleSuccess({
//       full: schedule,
//       filtered,
//       active: activeGames,
//       dateFilterFrom: today,
//       dateFilterTo: tomorrow
//     })
//   )
// }

export const fetchSchedule = () => dispatch => {
  dispatch(fetchScheduleRequest())
  let activeGames = []
  fetch(ACTIVE_GAMES_URL)
    .then(response => response.json())
    .catch(err => false)
    .then(data => (data ? (activeGames = data.games) : false))
    .then(data => (data ? fetch(SCHEDULE_URL) : false))
    .then(response => (response ? response.json() : false))
    .then(data => {
      let schedule
      let isOffline = false
      if (!data) {
        const local = Cabinet.get(NBA_LOCAL_STORAGE, {})
        if (!local.schedule) {
          // PubSub.publish(FETCH_SCHEDULE, { appUnavailable: true })
          return
        }
        isOffline = true
        schedule = local.schedule
      } else {
        activeGames = formatActiveGames(activeGames)
        schedule = scheduleByMonth(data.lscd, activeGames)
        Cabinet.set(NBA_LOCAL_STORAGE, { schedule })
      }

      let filtered = {}
      const today = new Date()
      const tomorrow = getTomorrowsDate(today)

      schedule[MONTH_NAMES[today.getMonth()]].map(g => {
        if (getDatesInRange(DAYS_AHEAD).indexOf(g.game_code) > -1) {
          if (filtered[g.game_code] === undefined) {
            filtered[g.game_code] = { games: [], date: g.date }
          }
          filtered[g.game_code].games.push(g)
        }
      })

      dispatch(
        fetchScheduleSuccess({
          full: schedule,
          filtered,
          active: activeGames,
          dateFilterFrom: today,
          dateFilterTo: tomorrow
        })
      )
    })
}

const getUpcoming = payload => ({
  type: "GET_UPCOMING_GAMES",
  payload
})

export const getUpcomingGames = (
  schedule,
  filtered,
  dateFilterTo
) => dispatch => {
  // get tomorrow's date RELATIVE to dateFilterTo
  const nextDaysDate = getTomorrowsDate(dateFilterTo)
  filtered = scheduleByDate(schedule, filtered, nextDaysDate)
  dispatch(getUpcoming({ filtered, dateFilterTo: nextDaysDate }))
}

const getPrevious = payload => ({
  type: "GET_PREVIOUS_GAMES",
  payload
})

export const getPreviousGames = (
  schedule,
  filtered,
  dateFilterFrom
) => dispatch => {
  // get yesterday's date RELATIVE to dateFilterFrom
  const previousDaysDate = getYesterdaysDate(dateFilterFrom)
  filtered = scheduleByDate(schedule, filtered, previousDaysDate)
  dispatch(getPrevious({ filtered, dateFilterFrom: previousDaysDate }))
}

const filterDate = payload => ({
  type: "FILTER_BY_DATE",
  payload
})

const filterTeamScheduleByDate = () => {}

export const filterByDate = (schedule, date) => (dispatch, getState) => {
  let team = getState().team
  let filtered = scheduleByDate(schedule, {}, date)
  let result = {}

  // if a team is selected, filter out games for this team only
  if (team.selected && team.schedule[team.selected.id]) {
    Object.keys(filtered).map(k => {
      let games = filtered[k].games
      games.map(g => {
        let game = team.schedule[team.selected.id][g.game_code]
        if (g.game_code == formatGameCode(formatDate(date)) && game) {
          result[g.game_code] = { ...game }
        }
      })
    })
  } else {
    result = filtered
  }

  dispatch(filterDate({ filtered: result, dateFilter: date }))
}
