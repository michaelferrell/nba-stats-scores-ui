import React, { Component } from "react"

import { NarrowContainer } from "./../Layout/"
import Tab from "./../Tab/"
import TeamStandingsTable from "./../Table/TeamStandingsTable"
import LoadingSpinner from "./../Spinner/LoadingSpinner"

import { COLOR } from "./../../constants/"

export default class extends Component {
  componentDidMount() {
    const { team, fetchTeamStandings } = this.props
    if (!team.standings) {
      fetchTeamStandings()
    }
  }

  render() {
    const { team } = this.props
    const standings = team.standings
    return (
      <NarrowContainer marginTop={"4em"}>
        {standings && (
            <Tab
              panes={[
                {
                  menuItem: "Eastern Conference",
                  render: () => <TeamStandingsTable data={standings.east} />
                },
                {
                  menuItem: "Western Conference",
                  render: () => <TeamStandingsTable data={standings.west} />
                }
              ]}
            />
        )}
        {standings === null && (
            <LoadingSpinner />
        )}
        {standings === false && (
          <div>Team standings unavailable at this time.</div>
        )}
      </NarrowContainer>
    )
  }
}
