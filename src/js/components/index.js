import React, { Component } from "react"
import styled from "styled-components"
import { Button, Grid, Dimmer } from "semantic-ui-react"

import { NarrowContainer } from "./Layout/"
import Header from "./Header/"
import GameList from "./Game/List"
import GameDetailModal from "./Modal/GameDetailModal"
import TeamStandingsModal from "./Modal/TeamStandingsModal"
import LoadingSpinner from "./Spinner/LoadingSpinner"

import { handlePageScroll } from "./../helpers/handlePageScroll"
import { COLOR } from "./../constants/"

const AppBackground = styled.div`
  background-color: ${COLOR.bg};
  color: ${COLOR.dustygray};
`

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
  componentDidMount() {
    const { fetchSchedule, fetchPlayers, schedule, player } = this.props
    if (Object.keys(schedule.full).length === 0) {
      fetchSchedule()
    }
    if (Object.keys(player.list).length === 0) {
      fetchPlayers()
    }
  }

  componentDidUpdate() {
    const { team } = this.props
    if (team.selected) {
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
      fetchRecapArticle
    } = this.props
    const game = this.props.game
    const player = this.props.player
    const team = this.props.team
    const modal = this.props.modal
    const fetching = this.props.schedule.fetching
    let filtered = this.props.schedule.filtered
    return (
      <AppBackground>
        <Header {...this.props} />
        <NarrowContainer style={{ marginTop: "3.5em" }}>
          {Object.keys(filtered).length === 0 &&
            !fetching && <div>No games on this date.</div>}
          {Object.keys(filtered).length > 0 &&
            !fetching && (
              <React.Fragment>
                {!team.selected && (
                  <Button
                    as={InvertedButton}
                    size="tiny"
                    inverted
                    onClick={this.handlePrevious}
                  >
                    Load Previous
                  </Button>
                )}
                <GameList {...this.props} />
                <MarginTop value={1.5}>
                  {!team.selected && (
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
        {modal.team_standings && (
          <TeamStandingsModal
            standings={team.standings}
            fetchTeamStandings={fetchTeamStandings}
            handleClose={closeAllModals}
          />
        )}
      </AppBackground>
    )
  }
}
