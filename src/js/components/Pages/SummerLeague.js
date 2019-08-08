import React, { Component } from "react"
import styled from "styled-components"

import { NarrowContainer } from "./../Layout/"
import GameList from "./../Game/List"
import GameDetailModal from "./../Modal/GameDetailModal"
import LoadingSpinner from "./../Spinner/LoadingSpinner"

const Section = styled.div`
  margin-top: 1.5em;
`

export default class extends Component {
  componentDidMount() {
    const { schedule, fetchSummerLeague } = this.props
    if (Object.keys(schedule.summerleague.schedule).length === 0) {
      fetchSummerLeague()
    }
  }

  render() {
    const {
      schedule,
      modal,
      game,
      player,
      fetchBoxscore,
      fetchRecapArticle,
      closeAllModals,
      gameDetailModal
    } = this.props
    const summerleague = schedule.summerleague
    return (
      <React.Fragment>
        <NarrowContainer marginTop={"4em"}>
          Summer league 2019
          {summerleague.fetching && <LoadingSpinner />}
          {!summerleague.fetching &&
            Object.keys(summerleague.schedule).length === 0 && (
              <div>Failed to fetch summer league schedule.</div>
            )}
          {!summerleague.fetching &&
            Object.keys(summerleague.schedule).length > 0 && (
              <GameList
                items={summerleague.schedule}
                handleClick={gameDetailModal}
              />
            )}
          <Section />
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
      </React.Fragment>
    )
  }
}
