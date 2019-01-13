import { combineReducers } from "redux"
import { routerReducer } from "react-router-redux"

import gameReducer from "./gameReducer"
import playerReducer from "./playerReducer"
import scheduleReducer from "./scheduleReducer"
import teamReducer from "./teamReducer"
import modalReducer from "./modalReducer"

const reducer = combineReducers({
  router: routerReducer,
  game: gameReducer,
  player: playerReducer,
  schedule: scheduleReducer,
  team: teamReducer,
  modal: modalReducer
})

export default reducer
