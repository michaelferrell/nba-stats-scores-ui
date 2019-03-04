import React from "react"
import Layout from "./../components/"
import { Provider, connect } from "react-redux"
import { ConnectedRouter, push } from "react-router-redux"
import "semantic-ui-less/semantic.less"
import "../../css/global.css"

import history from "./../store/history"

import {
  fetchBoxscore,
  fetchRecapArticle,
  fetchPlayers,
  fetchPlayerProfile,
  fetchTrackedPlayers,
  trackPlayer,
  removeTrackedPlayer,
  fetchSchedule,
  getSchedule,
  filterByDate,
  removeFilterByDate,
  getPreviousGames,
  getUpcomingGames,
  getLiveGame,
  fetchTeamStandings,
  filterByTeam,
  closeAllModals,
  gameDetailModal,
  seasonStatsModal,
  playerStatsModal,
  teamStandingsModal
} from "./../actions/"

const mapDispatchToProps = dispatch => ({
  navigateTo: location => {
    dispatch(push(location))
  },
  // game actions
  fetchBoxscore: game => dispatch(fetchBoxscore(game)),
  fetchRecapArticle: game => dispatch(fetchRecapArticle(game)),
  // player actions
  fetchPlayers: () => dispatch(fetchPlayers()),
  fetchPlayerProfile: id => dispatch(fetchPlayerProfile(id)),
  fetchTrackedPlayers: () => dispatch(fetchTrackedPlayers()),
  trackPlayer: id => dispatch(trackPlayer(id)),
  removeTrackedPlayer: id => dispatch(removeTrackedPlayer(id)),
  // schedule actions
  fetchSchedule: () => dispatch(fetchSchedule()),
  getSchedule: () => dispatch(getSchedule()),
  filterByDate: (schedule, date) => dispatch(filterByDate(schedule, date)),
  removeFilterByDate: () => dispatch(removeFilterByDate()),
  getPreviousGames: (schedule, filtered, dateFilterFrom) =>
    dispatch(getPreviousGames(schedule, filtered, dateFilterFrom)),
  getUpcomingGames: (schedule, filtered, dateFilterTo) =>
    dispatch(getUpcomingGames(schedule, filtered, dateFilterTo)),
  getLiveGame: () => dispatch(getLiveGame()),
  // team actions
  fetchTeamStandings: () => dispatch(fetchTeamStandings()),
  filterByTeam: (id, dateFilter) => dispatch(filterByTeam(id, dateFilter)),
  // modal actions
  closeAllModals: () => dispatch(closeAllModals()),
  gameDetailModal: payload => dispatch(gameDetailModal(payload)),
  seasonStatsModal: payload => dispatch(seasonStatsModal(payload)),
  playerStatsModal: payload => dispatch(playerStatsModal(payload)),
  teamStandingsModal: payload => dispatch(teamStandingsModal(payload))
})

const mapStateToProps = state => ({
  ...state.router,
  game: state.game,
  player: state.player,
  schedule: state.schedule,
  team: state.team,
  modal: state.modal
})

const index = props => (
  <Provider store={props.store}>
    <ConnectedRouter history={history}>
      <Layout {...props} />
    </ConnectedRouter>
  </Provider>
)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(index)
