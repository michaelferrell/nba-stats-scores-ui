import React, { Component } from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import { Grid, Menu } from "semantic-ui-react"

import { NarrowContainer, UnpaddedRow, UnpaddedColumn } from "./../Layout/"

import { COLOR } from "./../../constants/"

const FixedHeader = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  height: 40px;
  width: 100%;
  z-index: 999;
  background-color: #2c2c2c;
`

const StyledMenu = styled.div`
  &.ui.menu {
    background-color: inherit;
    border: 0;
  }
  &.ui.menu .item {
    color: #777;
    margin-right: 0.75em;
    &:hover {
      color: ${COLOR.silver};
    }
  }
  &.ui.menu .item:before {
    background: transparent;
  }
`

export default class extends Component {
  handleSeasonStats = () => {
    const { seasonStatsModal, modal } = this.props
    if (!modal.season_stats) {
      seasonStatsModal()
    }
  }

  handleStandings = () => {
    const { teamStandingsModal, modal } = this.props
    if (!modal.team_standings) {
      teamStandingsModal()
    }
  }
  render() {
    return (
      <FixedHeader>
        <NarrowContainer>
          <Grid>
            <Grid.Row as={UnpaddedRow}>
              <Grid.Column as={UnpaddedColumn} width={16}>
                <Menu as={StyledMenu}>
                  {
                    // <Menu.Item onClick={this.handleSeasonStats}>
                    //   Season Stats
                    // </Menu.Item>
                  }
                  <Menu.Item as={Link} to="/">
                    Home
                  </Menu.Item>
                  <Menu.Item as={Link} to="/tracker">
                    Player Tracker
                  </Menu.Item>
                  <Menu.Item onClick={this.handleStandings}>
                    Standings
                  </Menu.Item>
                </Menu>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </NarrowContainer>
      </FixedHeader>
    )
  }
}
