import React, { Component } from "react"
import styled from "styled-components"
import { Button, Grid, Menu, Dropdown, Popup, Icon } from "semantic-ui-react"

import Calendar from "./Calendar"
import FilterLabel from "./FilterLabel"

import {
  FixedHeader,
  NarrowContainer,
  UnpaddedRow,
  UnpaddedColumn
} from "./../Layout/"

import { formatDate } from "./../../helpers/formatDate"
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

  setFilterLabel = date => {
    if (date === null) {
      return "Choose Date"
    }
    const d = formatDate(date)
    return d.day_abbr + ", " + d.month_abbr + " " + d.date
  }

  handleStandings = () => {
    const { teamStandingsModal, modal } = this.props
    if (!modal.team_standings) {
      teamStandingsModal()
    }
  }

  handleFilterByTeam = teamId => {
    const { schedule, team, fetchSchedule, filterByTeam } = this.props
    // convert id back into a number
    if (teamId === "all") {
      fetchSchedule()
    } else if (team.selected && teamId === team.selected.id) {
      console.log('do nothing')
    } else {
      filterByTeam(parseInt(teamId), schedule.dateFilter)
    }
  }

  render() {
    // const { dateFilter, handleCalendarChange, handleFilterByTeam } = this.props
    const { filterByDate } = this.props
    const { schedule } = this.props
    const { showCalendar } = this.state
    let dateFilter = schedule.dateFilter
    const teamOptions = this.getTeamOptions()
    return (
      <FixedHeader>
        <NarrowContainer>
          <Grid>
            <Grid.Row as={UnpaddedRow}>
              <Grid.Column as={UnpaddedColumn} width={13}>
                <Menu as={FilterBar}>
                  <Calendar
                    open={showCalendar}
                    trigger={
                      <Menu.Item
                        as={LinkItem}
                        onClick={() => this.setState({ showCalendar: !showCalendar })}
                      >
                        <FilterLabel label={this.setFilterLabel(dateFilter)} />
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
                  <Menu.Item>
                    <Button
                      as={LinkButton}
                      onClick={this.handleStandings}
                      content="Standings"
                    />
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
