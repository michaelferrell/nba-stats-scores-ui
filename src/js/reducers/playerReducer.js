const default_state = {
  list: {},
  tracked: [],
  selected: null,
  profiles: {},
  profile_success: false,
  profile_error: false,
  schedule: null
}

export default (state = default_state, action) => {
  const { payload } = action
  let tracked
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
    case "FETCH_PLAYER_PROFILE_SUCCESS":
      let profiles = { ...state.profiles }
      if (profiles[payload.id] === undefined) {
        profiles[payload.id] = { ...payload.profile }
      }
      return {
        ...state,
        profile_success: true,
        profile_error: false,
        selected: payload.id,
        profiles
      }
    case "FETCH_PLAYER_PROFILE_ERROR":
      return {
        ...state,
        profile_success: false,
        profile_error: true,
        selected: payload.id
      }
    case "FETCH_TRACKED_PLAYERS_SUCCESS":
      return {
        ...state,
        tracked: [...payload]
      }
    case "TRACK_PLAYER_SUCCESS":
      return {
        ...state,
        tracked: [...payload]
      }
    case "REMOVE_TRACKED_PLAYER_SUCCESS":
      return {
        ...state,
        tracked: [...payload]
      }
    case "REMOVE_TRACKED_PLAYER_ERRROR":
      return {
        ...state
      }
    default:
      return state
  }
}
