import React, { Component } from "react"
import styled from "styled-components"
import { Grid } from "semantic-ui-react"

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
    const { items, handleClick } = this.props
    return (
      <div>
        {Object.keys(items).map(groupId => (
          <MarginTop id={groupId} key={groupId}>
            <GroupTitle>{displayGameDate(items[groupId].date)}</GroupTitle>
            <Grid as={MainGrid} columns="two">
              <Grid.Row as={UnpaddedRow}>
                {items[groupId].games.map((game, idx) => (
                  <Grid.Column as={UnpaddedColumn} key={game.game_id}>
                    {game.status === "final" ? (
                      <GameItem
                        game={game}
                        handleClick={game => handleClick(game)}
                        oddNumber={idx % 2}
                      />
                    ) : game.status === "active" ? (
                      <GameItem game={game} oddNumber={idx % 2} />
                    ) : game.status === "upcoming" ? (
                      <GameItem game={game} oddNumber={idx % 2} />
                    ) : null}
                  </Grid.Column>
                ))}
              </Grid.Row>
            </Grid>
          </MarginTop>
        ))}
      </div>
    )
  }
}
