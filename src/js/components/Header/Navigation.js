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
  &.ui.menu .active.item {
    color: #bebebe;
    &:hover {
      color: #bebebe;
    }
  }
`

const PATHS = {
  nba: "/nba",
  stats: "/stats",
  standings: "/standings",
  summerleague: "/summerleague"
}

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

  getPathName = () => window.location.pathname

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
                  <Menu.Item
                    as={Link}
                    to={PATHS.nba}
                    active={this.getPathName() === PATHS.nba}
                  >
                    Home
                  </Menu.Item>
                  <Menu.Item
                    as={Link}
                    to={PATHS.stats}
                    active={this.getPathName() === PATHS.stats}
                  >
                    Player Stats
                  </Menu.Item>
                  <Menu.Item
                    as={Link}
                    to={PATHS.standings}
                    active={this.getPathName() === PATHS.standings}
                  >
                    Standings
                  </Menu.Item>
                  <Menu.Item
                    as={Link}
                    to={PATHS.summerleague}
                    active={this.getPathName() === PATHS.summerleague}
                  >
                    Summer League
                  </Menu.Item>
                  {
                    // <Menu.Item onClick={this.handleStandings}>
                    //   Standings
                    // </Menu.Item>
                  }
                </Menu>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </NarrowContainer>
      </FixedHeader>
    )
  }
}
