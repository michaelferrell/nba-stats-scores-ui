const default_state = {
  list: {}
}

export default (state = default_state, action) => {
  const { payload } = action
  switch (action.type) {
    case "FETCH_PLAYERS_SUCCESS":
      return {
        ...state,
        list: { ...payload }
      }
    case "FETCH_PLAYERS_ERROR":
      return {
        ...state,
        list: {}
      }
    default:
      return state
  }
}
