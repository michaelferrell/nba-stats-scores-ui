const default_state = {
  standings: null,
  selected: { id: null },
  schedule: {}
}

export default (state = default_state, action) => {
  const { payload } = action
  switch (action.type) {
    case "FETCH_SCHEDULE_SUCCESS":
      return {
        ...state,
        selected: {...default_state.selected}
      }
    case "GET_SCHEDULE_SUCCESS":
      return {
        ...state,
        selected: {...default_state.selected}
      }
    case "FETCH_TEAM_STANDINGS_SUCCESS":
      return {
        ...state,
        standings: { ...payload }
      }
    case "FETCH_TEAM_STANDINGS_ERROR":
      return {
        ...state,
        standings: false
      }
    case "FETCH_TEAM_SCHEDULE_SUCCESS":
      let schedule = { ...state.schedule }
      if (schedule[payload.id] === undefined) {
        schedule[payload.id] = { ...payload.schedule }
      }
      return {
        ...state,
        schedule,
        selected: { id: payload.id, nextGameCode: payload.nextGameCode }
      }
    default:
      return state
  }
}
