import React, { Component } from "react"
import styled from "styled-components"
import { Button, Grid, Menu, Dropdown } from "semantic-ui-react"

import Calendar from "./Calendar"
import FilterLabel from "./FilterLabel"

import {
  FixedHeader,
  NarrowContainer,
  UnpaddedRow,
  UnpaddedColumn
} from "./../Layout/"

import { COLOR, TEAMS } from "./../../constants/"

const FilterBar = styled.div`
  &.ui.menu {
    background-color: inherit;
    border: 0;
  }
  &.ui.menu .item {
    color: ${COLOR.silver};
  }
  &.ui.menu .item:before {
    background: #3e3e3e;
  }
`

const LinkItem = styled.a`
  cursor: default !important;
  &:hover {
    color: ${COLOR.silver} !important;
  }
`

const LinkButton = styled(Button)`
  &.ui.button {
    background-color: inherit;
    color: ${COLOR.dustygray};
    font-weight: normal;
    padding: 0;
    &:hover,
    &:active,
    &:focus {
      background-color: inherit;
      color: inherit;
    }
  }
`

const MarginLeft = styled.div`
  &.item {
    margin-left: 1.5em;
  }
`
const minDate = new Date("9/1/18")
const maxDate = new Date("5/1/19")

export default class extends Component {
  state = { showCalendar: false }

  getTeamOptions = () => {
    let options = Object.keys(TEAMS).map(key => {
      return {
        text: TEAMS[key].city + " " + TEAMS[key].name,
        value: key
      }
    })
    options.unshift({ text: "Team: All", value: "all" })
    return options
  }

  handleStandings = () => {
    const { teamStandingsModal, modal } = this.props
    if (!modal.team_standings) {
      teamStandingsModal()
    }
  }

  handleFilterByTeam = teamId => {
    const { schedule, team, getSchedule, filterByTeam } = this.props
    let selectedId = team.selected ? team.selected.id : null
    if (teamId === "all") {
      getSchedule()
    } else if (parseInt(teamId) !== selectedId) {
      filterByTeam(parseInt(teamId), schedule.dateFilter)
    }
  }

  render() {
    const { schedule, filterByDate, removeFilterByDate } = this.props
    const { showCalendar } = this.state
    let dateFilter = schedule.dateFilter
    const teamOptions = this.getTeamOptions()
    return (
      <FixedHeader>
        <NarrowContainer>
          <Grid>
            <Grid.Row as={UnpaddedRow}>
              <Grid.Column as={UnpaddedColumn} width={16}>
                <Menu as={FilterBar}>
                  <Calendar
                    open={showCalendar}
                    trigger={
                      <Menu.Item as={LinkItem}>
                        <FilterLabel
                          dateFilter={dateFilter}
                          handleOpen={() =>
                            this.setState({ showCalendar: !showCalendar })
                          }
                          handleRemove={removeFilterByDate}
                        />
                      </Menu.Item>
                    }
                    handleChange={date => {
                      this.setState({ showCalendar: false })
                      filterByDate(schedule.full, date)
                    }}
                    handleClose={() => this.setState({ showCalendar: false })}
                    value={dateFilter}
                  />
                  <Menu.Item>
                    <Dropdown
                      options={teamOptions}
                      scrolling
                      onChange={(e, { value }) =>
                        this.handleFilterByTeam(value)
                      }
                      defaultValue={teamOptions[0].value}
                    />
                  </Menu.Item>
                  <Menu.Menu position="right">
                    <Menu.Item>
                      <Button
                        as={LinkButton}
                        onClick={this.handleStandings}
                        content="Standings"
                      />
                    </Menu.Item>
                  </Menu.Menu>
                </Menu>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </NarrowContainer>
      </FixedHeader>
    )
  }
}
