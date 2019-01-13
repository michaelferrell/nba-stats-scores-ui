import Cabinet from "cabinet-storage"

import { formatPlayers } from "./../helpers/formatPlayers"
import { PLAYERS_URL, LOCAL_STORAGE_ALL_PLAYERS } from "./../constants/"

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
