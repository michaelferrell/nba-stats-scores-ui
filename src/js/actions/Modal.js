export const closeAllModals = () => ({ type: "CLOSE_ALL_MODALS" })

export const gameDetailModal = payload => ({
  type: "GAME_DETAIL_MODAL",
  payload
})

export const seasonStatsModal = payload => ({
  type: "SEASON_STATS_MODAL",
  payload
})

export const teamStandingsModal = payload => ({
  type: "TEAM_STANDINGS_MODAL",
  payload
})