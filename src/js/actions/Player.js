import Cabinet from "cabinet-storage"

import { filterByTeam, fetchTeamSchedule } from "./"
import TeamScheduleModel from "./../model/TeamScheduleModel"
import { formatPlayers } from "./../helpers/formatPlayers"
import {
  PLAYERS_URL,
  PLAYER_PROFILE_URL,
  LOCAL_STORAGE_ALL_PLAYERS,
  LOCAL_STORAGE_TRACKED_PLAYERS
} from "./../constants/"

const fetchPlayersSuccess = payload => ({
  type: "FETCH_PLAYERS_SUCCESS",
  payload
})

const fetchPlayersError = payload => ({
  type: "FETCH_PLAYERS_ERROR",
  payload
})

export const fetchPlayers = () => dispatch => {
  let players = Cabinet.get(LOCAL_STORAGE_ALL_PLAYERS)
  if (players) {
    dispatch(fetchPlayersSuccess(players))
  } else {
    fetch(PLAYERS_URL)
      .then(response => response.json())
      .catch(err => {
        dispatch(fetchPlayersError(err))
      })
      .then(data => {
        if (data) {
          const formatted = formatPlayers(data.league.standard)
          players = Cabinet.set(LOCAL_STORAGE_ALL_PLAYERS, formatted, {
            expires: { value: 14, unit: "day" }
          })
          dispatch(fetchPlayersSuccess(players))
        } else {
          dispatch(fetchPlayersError(data))
        }
      })
  }
}

 const fetchPlayerProfileSuccess = payload => ({
  type: "FETCH_PLAYER_PROFILE_SUCCESS",
  payload
 })

export const fetchPlayerProfile = id => dispatch => {
  let players = Cabinet.get(LOCAL_STORAGE_ALL_PLAYERS)
  let player = players[id]
  fetch(PLAYER_PROFILE_URL + "?player_id=" + id)
    .then(response => response.json())
    .catch(err => {
      console.log('error')
    })
    .then(data => {
      if (data) {
        let stats = data.league.standard.stats
        let profile = {
          bio: player,
          stats: {
            career: stats.careerSummary,
            season: stats.regularSeason.season
          }
        }
        dispatch(fetchPlayerProfileSuccess(profile))
      }
    })
}

const fetchTrackedPlayersSuccess = payload => ({
  type: "FETCH_TRACKED_PLAYERS_SUCCESS",
  payload
})

export const fetchTrackedPlayers = () => dispatch => {
  let tracked = Cabinet.get(LOCAL_STORAGE_TRACKED_PLAYERS, [])
  dispatch(fetchTrackedPlayersSuccess(tracked))
}

const trackPlayerSuccess = payload => ({
  type: "TRACK_PLAYER_SUCCESS",
  payload
})

export const trackPlayer = id => dispatch => {
  let tracked = Cabinet.get(LOCAL_STORAGE_TRACKED_PLAYERS, [])
  if (tracked.indexOf(id) === -1) {
    let updated = Cabinet.set(LOCAL_STORAGE_TRACKED_PLAYERS, [ ...tracked, id ])
    dispatch(trackPlayerSuccess(updated))
  }
}

const removeTrackedPlayerSuccess = payload => ({
  type: "REMOVE_TRACKED_PLAYER_SUCCESS",
  payload
})

const removeTrackedPlayerError = payload => ({
  type: "REMOVE_TRACKED_PLAYER_ERRROR",
  payload
})

export const removeTrackedPlayer = id => dispatch => {
  let tracked = Cabinet.get(LOCAL_STORAGE_TRACKED_PLAYERS, [])
  let index = tracked.indexOf(id)
  if (index > -1) {
      tracked.splice(index, 1)
      Cabinet.set(LOCAL_STORAGE_TRACKED_PLAYERS, tracked)
      dispatch(removeTrackedPlayerSuccess(tracked))
  } else {
    dispatch(removeTrackedPlayerError(id))
    throw new Error("Could not remove player '" + id + "'. ID not found.")
  }
}

const fetchPlayerScheduleSuccess = payload => ({
  type: "FETCH_PLAYER_SCHEDULE_SUCCESS",
  payload
})

export const fetchPlayerSchedule = id => (dispatch, getState) => {
  let player = getState().player
  let team_id = player.list[id].team_id
  let schedule = []
  fetchTeamSchedule(parseInt(team_id)).then(data => {
    if (data && data.league && data.league.standard) {
      data.league.standard
        .filter(g => g.nugget.text !== "Preseason" && g.hTeam.score.length > 0)
        .map(g => {
           schedule.push(new TeamScheduleModel(g))
        })
        dispatch(fetchPlayerScheduleSuccess({ id, schedule }))
    }
  })
}