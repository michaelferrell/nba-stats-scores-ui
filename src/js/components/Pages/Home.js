import React, { Component } from "react"
import { BrowserRouter as Router, Link, Route } from "react-router-dom"
import styled from "styled-components"
import { Button, Grid, Dimmer } from "semantic-ui-react"

import { NarrowContainer } from "./../Layout/"
import GameList from "./../Game/List"
import GameDetailModal from "./../Modal/GameDetailModal"
import PlayerStatsModal from "./../Modal/PlayerStatsModal"
import SeasonStatsModal from "./../Modal/SeasonStatsModal"
import TeamStandingsModal from "./../Modal/TeamStandingsModal"
import LoadingSpinner from "./../Spinner/LoadingSpinner"

import { handlePageScroll } from "./../../helpers/handlePageScroll"
import { COLOR } from "./../../constants/"

const MarginTop = styled.div`
  margin-top: ${props => props.value || "0"}em;
`

const InvertedButton = styled.button`
  &.ui.inverted.button {
    box-shadow: inset 0 0 0 1px #555 !important;
    color: ${COLOR.dustygray};
    border-radius: 0;
    font-weight: normal;
    display: block;
    margin: 0 auto 0;
    &:hover {
      opacity: 0.8;
    }
    &:hover,
    &:active,
    &:focus {
      box-shadow: inset 0 0 0 1px #555 !important;
      background-color: inherit !important;
      color: ${COLOR.dustygray};
    }
  }
`

const getPageHeight = () => {
  let body = document.body,
    html = document.documentElement
  return Math.max(
    body.scrollHeight,
    body.offsetHeight,
    html.clientHeight,
    html.scrollHeight,
    html.offsetHeight
  )
}

export default class extends Component {
  componentDidUpdate() {
    const { team } = this.props
    if (team.selected.id) {
      handlePageScroll(team.selected.nextGameCode)
    }
  }

  handlePrevious = () => {
    const { getPreviousGames, schedule } = this.props
    let pageHeight = getPageHeight()

    getPreviousGames(schedule.full, schedule.filtered, schedule.dateFilterFrom)

    setTimeout(() => {
      let pageHeightNew = getPageHeight()
      let difference = pageHeightNew - pageHeight
      window.scrollTo(0, difference + 3)
    }, 0)
  }

  getPreviousGames = () => {}

  handleUpcoming = () => {
    const { getUpcomingGames, schedule } = this.props
    getUpcomingGames(schedule.full, schedule.filtered, schedule.dateFilterTo)
  }

  render() {
    const {
      closeAllModals,
      fetchTeamStandings,
      fetchBoxscore,
      fetchRecapArticle,
      fetchTrackedPlayers,
      fetchPlayerProfile,
      trackPlayer,
      removeTrackedPlayer,
      fetchPlayerSchedule
    } = this.props
    const game = this.props.game
    const player = this.props.player
    const team = this.props.team
    const modal = this.props.modal
    const fetching = this.props.schedule.fetching
    let dateFilter = this.props.schedule.dateFilter
    let filtered = this.props.schedule.filtered
    return (
      <React.Fragment>
        <NarrowContainer marginTop={"5.5em"}>
          {Object.keys(filtered).length === 0 && !fetching && (
            <div>No games on this date.</div>
          )}
          {Object.keys(filtered).length > 0 && !fetching && (
            <React.Fragment>
              {!team.selected.id && !dateFilter && (
                <Button
                  as={InvertedButton}
                  size="tiny"
                  inverted
                  onClick={this.handlePrevious}
                >
                  Load Previous
                </Button>
              )}
              <GameList
                items={filtered}
                handleClick={this.props.gameDetailModal}
              />
              <MarginTop value={1.5}>
                {!team.selected.id && !dateFilter && (
                  <Button
                    as={InvertedButton}
                    size="tiny"
                    inverted
                    onClick={() => {
                      this.handleUpcoming()
                    }}
                  >
                    Load More
                  </Button>
                )}
              </MarginTop>
            </React.Fragment>
          )}
          {fetching && <LoadingSpinner />}
        </NarrowContainer>
        {modal.game_detail && (
          <GameDetailModal
            game={modal.game_detail}
            boxscore={game.boxscore}
            players={player.list}
            article={game.article}
            fetchBoxscore={fetchBoxscore}
            fetchRecapArticle={fetchRecapArticle}
            handleClose={closeAllModals}
          />
        )}
        {/*DELETE!*/}
        {modal.player_stats && (
          <PlayerStatsModal
            game={modal.player_stats}
            boxscore={game.boxscore}
            player={player}
            article={game.article}
            fetchBoxscore={fetchBoxscore}
            fetchRecapArticle={fetchRecapArticle}
            handleClose={closeAllModals}
          />
        )}
        {modal.season_stats && (
          <SeasonStatsModal handleClose={closeAllModals} />
        )}
        {modal.team_standings && (
          <TeamStandingsModal
            standings={team.standings}
            fetchTeamStandings={fetchTeamStandings}
            handleClose={closeAllModals}
          />
        )}
      </React.Fragment>
    )
  }
}
