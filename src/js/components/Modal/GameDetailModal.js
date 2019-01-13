import React, { Component } from "react"
import { Grid, Modal, Table, Dimmer } from "semantic-ui-react"
import styled, { css } from "styled-components"

import ScoreboardTable from "./../Table/ScoreboardTable"
import GameStatsTable from "./../Table/GameStatsTable"
import LoadingSpinner from "./../Spinner/LoadingSpinner"
import GameArticle from "./../Game/Article"
import StatLeaders from "./../Game/StatLeaders"
import Tab from "./../Tab/"

import StatsModel from "./../../model/StatsModel"
import { COLOR } from "./../../constants/"
import { displayGameDate } from "./../../helpers/displayGameDate"



const StyledModalHeader = styled.div`
  &.header {
    padding-top: 0 !important;
  }
`

const StyledModalContent = styled.div`
  &.content {
    padding-top: 0 !important;
  }
`

const StyledScoreTable = css`
  &.ui.inverted.table {
    width: auto;
    background-color: inherit;
    border-radius: 0;
    margin: 0 2em 0 0;
  }
`

const LeftScoreTable = styled.table`
  ${StyledScoreTable};
`

const RightScoreTable = styled.table`
  ${StyledScoreTable};
`

const HorizontalScroll = styled.div`
  overflow-y: auto;
`

export default class extends Component {
  componentDidMount() {
    const {
      game,
      boxscore,
      article,
      fetchBoxscore,
      fetchRecapArticle
    } = this.props
    if (!boxscore) {
      fetchBoxscore(game)
    }
    if (!article) {
      fetchRecapArticle(game)
    }
  }
  filterStats = stats => stats.filter(s => s.min !== "")

  render() {
    const { game, boxscore, players, article, handleClose } = this.props
    let stats = boxscore && players && new StatsModel(boxscore, game, players)
    return (
      <Modal
        open={true}
        basic
        inverted
        closeIcon
        onClose={handleClose}
        size="large"
        centered={false}
        closeOnDimmerClick={false}
      >
        <Modal.Header as={StyledModalHeader}>
          {displayGameDate(game.date)}
        </Modal.Header>
        <Modal.Content>
          <Grid>
            <Grid.Row>
              <ScoreboardTable
                as={LeftScoreTable}
                id={game.visitor_team.id}
                name={game.visitor_team.name}
                score={game.score ? game.score.visitor_team : null}
                record={
                  game.status === "final" ? game.visitor_team.record : null
                }
                highlighted={
                  game.score && game.score.visitor_team > game.score.home_team
                }
                size="large"
                away={true}
                hideWinnerIcon={true}
              />
              <ScoreboardTable
                as={RightScoreTable}
                id={game.home_team.id}
                name={game.home_team.name}
                score={game.score ? game.score.home_team : null}
                record={game.status === "final" ? game.home_team.record : null}
                highlighted={
                  game.score && game.score.home_team > game.score.visitor_team
                }
                size="large"
                away={true}
                hideWinnerIcon={true}
              />
            </Grid.Row>
          </Grid>
        </Modal.Content>
        <Modal.Content as={StyledModalContent}>
          {stats ? (
            <Tab
              panes={[
                {
                  menuItem: "Stat Leaders",
                  render: () => (
                    <StatLeaders stats={stats} players={players} />
                  )
                },
                {
                  menuItem: game.visitor_team.name,
                  render: () => (
                    <HorizontalScroll>
                      <GameStatsTable data={this.filterStats(stats.team1)} />
                    </HorizontalScroll>
                  )
                },
                {
                  menuItem: game.home_team.name,
                  render: () => (
                    <HorizontalScroll>
                      <GameStatsTable data={this.filterStats(stats.team2)} />
                    </HorizontalScroll>
                  )
                },
                {
                  menuItem: "Recap",
                  render: () =>
                    article ? (
                      <GameArticle article={article} />
                    ) : (
                      <div>Recap article unavailable.</div>
                    )
                }
              ]}
            />
          ) : (
            <LoadingSpinner />
          )}
        </Modal.Content>
      </Modal>
    )
  }
}
