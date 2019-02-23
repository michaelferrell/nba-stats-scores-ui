import TeamScheduleModel from "./../model/TeamScheduleModel"
import { formatDate } from "./../helpers/formatDate"
import { formatGameCode } from "./../helpers/formatGameCode"
import {
  TEAM_STANDINGS_URL,
  TEAM_SCHEDULE_URL,
  MONTH_NAMES
} from "./../constants/"

const fetchTeamStandingsSuccess = payload => ({
  type: "FETCH_TEAM_STANDINGS_SUCCESS",
  payload
})

const fetchTeamStandingsError = payload => ({
  type: "FETCH_TEAM_STANDINGS_ERROR",
  payload
})


export const fetchTeamStandings = () => dispatch => {
  fetch(TEAM_STANDINGS_URL)
    .then(response => response.json())
    .catch(err => false)
    .then(data => {
      if (data) {
        const teamStandings = data.league.standard.conference
        dispatch(fetchTeamStandingsSuccess(teamStandings))
      } else {
        dispatch(fetchTeamStandingsError(data))
      }
    })
}

const fetchTeamScheduleSuccess = payload => ({
  type: "FETCH_TEAM_SCHEDULE_SUCCESS",
  payload
})

const fetchTeamScheduleError = payload => ({
  type: "FETCH_TEAM_SCHEDULE_ERROR",
  payload
})

export const fetchTeamSchedule = teamId => {
  return fetch(TEAM_SCHEDULE_URL + "?teamid=" + teamId)
    .then(response => response.json())
    .catch(err => false)
}

const filterByTeamRequest = () => ({
  type: "FILTER_BY_TEAM_REQUEST"
})

const filterByTeamSuccess = payload => ({
  type: "FILTER_BY_TEAM_SUCCESS",
  payload
})

const teamScheduleByDate = (schedule, dateFilter) => {
  let result = {}
  Object.keys(schedule).map(k => {
   let game_code = schedule[k].games[0].game_code
    if (game_code == formatGameCode(formatDate(dateFilter))) {
      result[game_code] = schedule[k]
    }
  })
  return result
}

export const filterByTeam = (teamId, dateFilter) => (dispatch, getState) => {
  let nextGameCode = null
  let schedule = {}
  let filtered = {}
  let activeGames = getState().schedule.active

  dispatch(filterByTeamRequest())

  // check if this team's schedule has already been fetched, if so, use it
  if (getState().team.schedule[teamId]) {
    schedule = getState().team.schedule[teamId]
    // if datefilter is set use it
    filtered = dateFilter ? teamScheduleByDate(schedule, dateFilter) : schedule
    dispatch(filterByTeamSuccess({ filtered }))
    dispatch(fetchTeamScheduleSuccess({ id: teamId, schedule, nextGameCode }))
    return
  }

  fetch(TEAM_SCHEDULE_URL + "?teamid=" + teamId)
    .then(response => response.json())
    .catch(err => false)
    .then(data => {
      if (data && data.league && data.league.standard) {
        data.league.standard
          .filter(g => g.nugget.text !== "Preseason")
          .map(g => {
            let gameModel
            if (activeGames[g.gameId]) {
              gameModel = new TeamScheduleModel(g, activeGames[g.gameId])
              nextGameCode = gameModel.game_code // use active gamecode
            } else {
              gameModel = new TeamScheduleModel(g)
              if (!nextGameCode && gameModel.score === null) {
                nextGameCode = gameModel.game_code // use nextgamecode
              }
            }
            if (schedule[gameModel.game_code] === undefined) {
              schedule[gameModel.game_code] = {
                games: [],
                date: gameModel.date
              }
            }
            schedule[gameModel.game_code].games.push(gameModel)
          })
        // if datefilter is set use it
        filtered = dateFilter ? teamScheduleByDate(schedule, dateFilter) : schedule
        dispatch(filterByTeamSuccess({ filtered }))
        dispatch(fetchTeamScheduleSuccess({ id: teamId, schedule, nextGameCode }))
      }
    })
}
