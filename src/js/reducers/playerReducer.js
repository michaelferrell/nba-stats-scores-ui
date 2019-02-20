const default_state = {
  list: {},
  tracked: [],
  selected: null,
  profile: null,
  schedule: null,
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
      return {
        ...state,
        profile: { ...payload }
      }
    case "FETCH_TRACKED_PLAYERS_SUCCESS":
      return {
        ...state,
        tracked: [ ...payload ]
      }
    case "TRACK_PLAYER_SUCCESS":
      return {
        ...state,
        tracked: [ ...payload ]
      }
    case "REMOVE_TRACKED_PLAYER_SUCCESS":
      return {
        ...state,
        tracked: [ ...payload ]
      }
    case "REMOVE_TRACKED_PLAYER_ERRROR":
      return {
        ...state
      }
    case "FETCH_PLAYER_SCHEDULE_SUCCESS":
      return {
        ...state,
        selected: payload.id,
        schedule: [ ...payload.schedule ],
      }
    default:
      return state
  }
}
