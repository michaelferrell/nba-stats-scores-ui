const default_state = {
  game_detail: false,
  team_standings: false,
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
    case "TEAM_STANDINGS_MODAL":
      return {
        ...state,
        team_standings: true
      }
    default:
      return state
  }
}
