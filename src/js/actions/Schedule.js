import Cabinet from "cabinet-storage"

import { filterByTeam } from "./"

import { formatActiveGames } from "./../helpers/formatActiveGames"
import { scheduleByMonth } from "./../helpers/scheduleByMonth"
import { scheduleByDate } from "./../helpers/scheduleByDate"
import { getYesterdaysDate } from "./../helpers/getYesterdaysDate"
import { getTodaysDate } from "./../helpers/getTodaysDate"
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
//   const today = getTodaysDate()
//   const tomorrow = getTomorrowsDate(today)

//   schedule[MONTH_NAMES[today.getMonth()]].map(g => {
//     if (getDatesInRange(DAYS_AHEAD, today).indexOf(g.game_code) > -1) {
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

const PLAYOFF_URL =
  "http://heroflicks.com/api/projects/nba-app/playoffgames.php"
let is_playoffs = true

export const fetchSchedule = () => dispatch => {
  dispatch(fetchScheduleRequest())
  let activeGames = []
  let playoffGames = {}

  if (is_playoffs) {
    fetch(PLAYOFF_URL)
      .then(response => (response ? response.json() : false))
      .then(data => playoffGames = data)
  }

  fetch(ACTIVE_GAMES_URL)
    .then(response => response.json())
    .catch(err => false)
    .then(data => (data ? (activeGames = data.games) : false))
    .then(data => (data ? fetch(SCHEDULE_URL) : false))
    .then(response => (response ? response.json() : false))
    .then(data => {
      let schedule
      let playoffs = []
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
        let result = scheduleByMonth(data.lscd, activeGames, playoffGames)
        schedule = result.regular
        playoffs = result.playoffs
        Cabinet.set(NBA_LOCAL_STORAGE, { schedule })
      }

      let filtered = {}
      const today = getTodaysDate()
      const tomorrow = getTomorrowsDate(today)
      const month_name = MONTH_NAMES[today.getMonth()]

      // if current month is in the nba season
      if (Object.keys(schedule).indexOf(month_name) > -1) {
        schedule[month_name].map(g => {
          if (getDatesInRange(DAYS_AHEAD, today).indexOf(g.game_code) > -1) {
            if (filtered[g.game_code] === undefined) {
              filtered[g.game_code] = { games: [], date: g.date }
            }
            filtered[g.game_code].games.push(g)
          }
        })
      }

      dispatch(
        fetchScheduleSuccess({
          full: schedule,
          filtered,
          playoffs,
          active: activeGames,
          dateFilterFrom: today,
          dateFilterTo: tomorrow
        })
      )
    })
}

const getScheduleSuccess = payload => ({
  type: "GET_SCHEDULE_SUCCESS",
  payload
})

export const getSchedule = () => (dispatch, getState) => {
  let schedule = getState().schedule.full
  let active = getState().schedule.active
  if (Object.keys(schedule).length === 0 || Object.keys(active).length === 0) {
    dispatch(fetchSchedule())
    return
  }
  let filtered = {}
  let dateFilter = null
  const today = getTodaysDate()
  const tomorrow = getTomorrowsDate(today)

  schedule[MONTH_NAMES[today.getMonth()]].map(g => {
    if (getDatesInRange(DAYS_AHEAD, today).indexOf(g.game_code) > -1) {
      if (filtered[g.game_code] === undefined) {
        filtered[g.game_code] = { games: [], date: g.date }
      }
      filtered[g.game_code].games.push(g)
    }
  })

  dispatch(
    getScheduleSuccess({
      full: schedule,
      filtered,
      active,
      dateFilter,
      dateFilterFrom: today,
      dateFilterTo: tomorrow
    })
  )
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

const removeDate = () => ({
  type: "REMOVE_FILTER_BY_DATE"
})

export const removeFilterByDate = () => (dispatch, getState) => {
  let team = getState().team
  if (team.selected) {
    dispatch(filterByTeam(team.selected.id))
    dispatch(removeDate())
  } else {
    dispatch(getSchedule())
  }
}

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
