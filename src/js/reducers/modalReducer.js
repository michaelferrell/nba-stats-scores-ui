const default_state = {
  game_detail: false,
  season_stats: false,
  player_tracker: false,
  team_standings: false,
  player_stats: false,
}

export default (state = default_state, action) => {
  const { payload } = action
  switch (action.type) {
    case "CLOSE_ALL_MODALS":
      return { ...default_state }
    case "GAME_DETAIL_MODAL":
      return {
        ...state,
        game_detail: payload
      }
    case "SEASON_STATS_MODAL":
      return {
        ...state,
        season_stats: true
      }
    case "PLAYER_TRACKER_MODAL":
      return {
        ...state,
        player_tracker: true
      }
    case "TEAM_STANDINGS_MODAL":
      return {
        ...state,
        team_standings: true
      }
    case "PLAYER_STATS_MODAL":
      return {
        ...state,
        player_stats: payload
      }
    default:
      return state
  }
}
