import React, { Component } from "react"
import { BrowserRouter as Router, Link, Route } from "react-router-dom"
import styled from "styled-components"

import Header from "./Header/"
import FilterBar from "./Header/FilterBar"
import HomePage from "./Pages/Home"
import PlayerTrackerPage from "./Pages/PlayerTracker"
import TeamStandingsPage from "./Pages/TeamStandings"

import { COLOR } from "./../constants/"

const AppBackground = styled.div`
  background-color: ${COLOR.bg};
  color: ${COLOR.dustygray};
`

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
  render() {
    return (
      <AppBackground>
        <Header {...this.props} />
        <Route
          exact={true}
          path="/nba"
          render={() => (
            <React.Fragment>
              <FilterBar {...this.props} />
              <HomePage {...this.props} />
            </React.Fragment>
          )}
        />
        <Route
          path="/tracker"
          render={() => <PlayerTrackerPage {...this.props} />}
        />
        <Route
          path="/standings"
          render={() => <TeamStandingsPage {...this.props} />}
        />
      </AppBackground>
    )
  }
}
