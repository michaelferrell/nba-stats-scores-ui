import React, { Component } from "react"
import styled from "styled-components"
import { Grid, Menu, Dropdown } from "semantic-ui-react"

import Calendar from "./Calendar"
import FilterLabel from "./FilterLabel"
import { NarrowContainer, UnpaddedRow, UnpaddedColumn } from "./../Layout/"

import { COLOR, TEAMS } from "./../../constants/"

const FixedFilterHeader = styled.div`
  position: fixed;
  left: 0;
  top: 48px;
  width: 100%;
  z-index: 999;
  background-color: #232121;
`

const StyledMenu = styled.div`
  &.ui.menu {
    background-color: inherit;
    border: 0;
  }
  &.ui.menu .item {
    color: ${COLOR.silver};
    padding-top: 0;
    padding-bottom: 0;
  }
  &.ui.menu .item:before {
    background: inherit;
  }
`

const LinkItem = styled.a`
  cursor: default !important;
  &:hover {
    color: ${COLOR.silver} !important;
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
      <FixedFilterHeader>
        <NarrowContainer>
          <Grid>
            <Grid.Row as={UnpaddedRow}>
              <Grid.Column as={UnpaddedColumn} width={16}>
                <Menu as={StyledMenu}>
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
                </Menu>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </NarrowContainer>
      </FixedFilterHeader>
    )
  }
}
