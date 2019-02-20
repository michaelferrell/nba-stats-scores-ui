import React, { Component } from "react"
import { Grid, Modal, Table, Dimmer } from "semantic-ui-react"
import styled, { css } from "styled-components"

import ScoreboardTable from "./../Table/ScoreboardTable"
import PlayerStatsTable from "./../Table/PlayerStatsTable"
import LoadingSpinner from "./../Spinner/LoadingSpinner"

import StatsModel from "./../../model/StatsModel"
import { COLOR } from "./../../constants/"
import { displayGameDate } from "./../../helpers/displayGameDate"
import { getPlayerHeadshotUrl } from "./../../helpers/getPlayerHeadshotUrl"



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

const Headshot = styled.img`
  border: 2px solid #222;
  border-radius: 3px;
  margin-bottom: 2em;
`

const PlayerHeadshot = (playerId, teamId) => (
  <Headshot src={getPlayerHeadshotUrl(playerId, teamId)} />
)

const StatItem = styled.div`
  &.column {
    text-align: center;
    margin-right: 1em;
    width: auto !important;
  }
`

const StatName = styled.h4`
  font-size: 1.5em;
`

const StatValue = styled.div`
  font-size: 1.8em;
  font-weight: bold;
  margin-top: 0.2em;
`

const OverviewStats = ({ data }) => {
  let { points, assists, totReb } = data
  points = parseInt(points)
  if (points >= 20) {
    points = <span class="text-green">{points}</span>
  }
  assists = parseInt(assists)
  if (assists >= 10) {
    assists = <span class="text-green">{assists}</span>
  }
  let rebounds = parseInt(totReb)
  if (rebounds >= 10) {
    rebounds = <span class="text-green">{rebounds}</span>
  }
  return (
    <Grid>
      <Grid.Row>
        <Grid.Column as={StatItem}>
          <StatName>Points</StatName>
          <StatValue>{points}</StatValue>
        </Grid.Column>
        <Grid.Column as={StatItem}>
          <StatName>Rebounds</StatName>
          <StatValue>{rebounds}</StatValue>
        </Grid.Column>
        <Grid.Column as={StatItem}>
          <StatName>Assists</StatName>
          <StatValue>{assists}</StatValue>
        </Grid.Column>
        <Grid.Column as={StatItem}>
          <StatName>+/-</StatName>
          <StatValue>{data.plusMinus}</StatValue>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}

export default class extends Component {
  componentDidMount() {
    const {
      game,
      boxscore,
      fetchBoxscore
    } = this.props
    if (!boxscore) {
      fetchBoxscore(game)
    }
  }

  setPlayerStats = (boxscore, id) => {
    let stats = boxscore.activePlayers.filter(key => key.personId === id)
    return stats.length > 0 ? stats[0] : null
  }

  render() {
    const { game, boxscore, player, handleClose } = this.props
    let name = player.list[player.selected].name
    const team_id = parseInt(player.list[player.selected].team_id)
    let stats = boxscore && player.list ? this.setPlayerStats(boxscore, player.selected) : null
    return (
      <Modal
        open={false}
        basic
        inverted
        closeIcon
        onClose={handleClose}
        size="large"
        centered={false}
        closeOnDimmerClick={false}
      >
        <Modal.Header as={StyledModalHeader}>
          {name}, {displayGameDate(game.date)}
        </Modal.Header>
        <Modal.Content>
          <Grid>
            <Grid.Row>
              {

              // <ScoreboardTable
              //   as={LeftScoreTable}
              //   id={game.visitor_team.id}
              //   name={game.visitor_team.name}
              //   score={game.score ? game.score.visitor_team : null}
              //   record={
              //     game.status === "final" ? game.visitor_team.record : null
              //   }
              //   highlighted={
              //     game.score && game.score.visitor_team > game.score.home_team
              //   }
              //   size="large"
              //   away={true}
              //   hideWinnerIcon={true}
              // />
              // <ScoreboardTable
              //   as={RightScoreTable}
              //   id={game.home_team.id}
              //   name={game.home_team.name}
              //   score={game.score ? game.score.home_team : null}
              //   record={game.status === "final" ? game.home_team.record : null}
              //   highlighted={
              //     game.score && game.score.home_team > game.score.visitor_team
              //   }
              //   size="large"
              //   away={true}
              //   hideWinnerIcon={true}
              // />
              }
            </Grid.Row>
          </Grid>
        </Modal.Content>
        <Modal.Content as={StyledModalContent}>
          {stats ? (
            <Grid>
              <Grid.Row>
                <Grid.Column width={16}>
                  <OverviewStats data={stats} />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={16}>
                  <PlayerStatsTable data={stats} />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          ) : (
            <LoadingSpinner />
          )}
        </Modal.Content>
      </Modal>
    )
  }
}
