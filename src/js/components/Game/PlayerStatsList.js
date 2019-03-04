import React, { Component } from "react"
import styled from "styled-components"
import { Button, Grid } from "semantic-ui-react"

import { MainGrid, UnpaddedRow, UnpaddedColumn } from "./../Layout/"
import GameItem from "./Item"

import { displayGameDate } from "./../../helpers/displayGameDate"

const MarginTop = styled.div`
  margin-top: ${props => props.value || "0"}em;
`

const GroupTitle = styled.div`
  margin-left: -1em;
  margin-top: 1em;
  font-weight: bold;
`

export default class extends Component {
  render() {
    const { player, game, playerStatsModal } = this.props
    const team_id = player.list[player.selected].team_id
    return (
      <div>
        {player.schedule.map((game, idx) => (
          <Grid as={MainGrid} key={game.game_id}>
            <Grid.Row as={UnpaddedRow}>
              <Grid.Column as={UnpaddedColumn} key={game.game_id} width={8}>
                <GameItem
                  game={game}
                  handleClick={game => playerStatsModal(game)}
                  oddNumber={idx % 2}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        ))}
      </div>
    )
  }
}