import React, { Component } from "react"
import { Dropdown, Icon, Grid } from "semantic-ui-react"
import styled, { css } from "styled-components"

import { NarrowContainer } from "./../Layout/"
import PlayerDrawer from "./../Player/Drawer"
import PlayerStatsList from "./../Game/PlayerStatsList"
import LoadingSpinner from "./../Spinner/LoadingSpinner"

import { COLOR } from "./../../constants/"

const SectionTitle = styled.h3`
  color: ${COLOR.silver};
`

const StyledDropdown = styled.div`
  .ui.selection.dropdown {
    background-color: ${COLOR.mineshaft};
    border-color: ${COLOR.mineshaft};
  }
  .ui.selection.active.dropdown,
  .ui.selection.active.dropdown:hover {
    border-color: ${COLOR.mineshaft};
  }
  .ui.selection.dropdown,
  .ui.active.search.dropdown input.search:focus + .text,
  .ui.selection.visible.dropdown > .text:not(.default),
  .ui.search.dropdown.active > input.search,
  .ui.search.dropdown.visible > input.search {
    color: ${COLOR.white};
  }
`

const Section = styled.div`
  margin-top: 1.5em;
`

const List = styled.ul`
  margin: 0;
  padding: 0;
`

const ListItem = styled.li`
  list-style: none;
  margin: 0 0 0.5em;
  padding: 0;
  width: 20em;
`

const ListItemText = styled.span`
  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`

const DeleteIcon = styled.i`
  &.icon {
    float: right;
    margin-left: 0.5em;
    cursor: pointer;
    opacity: 0.6;
    font-size: 0.9em;
  }
`

export default class extends Component {
  componentDidMount() {
    const { player, fetchTrackedPlayers } = this.props
    if (player.tracked.length === 0) {
      fetchTrackedPlayers()
    }
  }

  formatPlayerOptions = (players, tracked) => {
    return Object.keys(players).map(id => ({
      key: id,
      value: id,
      text: players[id].name,
      team_id: players[id].team_id,
      // disabled: tracked.indexOf(id) > -1
    }))
  }

  render() {
    const {
      closeAllModals,
      player,
      game,
      trackPlayer,
      fetchPlayerProfile,
      removeTrackedPlayer,
      playerStatsModal
    } = this.props
    const fetching = this.props.schedule.fetching
    return (
      <NarrowContainer marginTop={"4em"}>
        Compare stats of your favorite NBA players
        <Section>
          <StyledDropdown>
            <Dropdown
              placeholder="Search active players"
              search
              selection
              options={this.formatPlayerOptions(player.list, player.tracked)}
              onChange={(e, { value }) => {
                fetchPlayerProfile(value)
                // dont add player to tracked list for now
                // trackPlayer(value)
              }}
              value={null}
            />
          </StyledDropdown>
        </Section>
        {/*dont show tracked player section for now*/}
        <Section style={{display: "none"}}>
          <h4>Tracked Players:</h4>
          {Object.keys(player.list).length > 0 && player.tracked.length > 0 ? (
            <List>
              {player.tracked.map(id => (
                <ListItem key={id}>
                  <ListItemText
                    onClick={() => {
                      fetchPlayerProfile(id)
                      // closeAllModals()
                    }}
                  >
                    {player.list[id].name}
                  </ListItemText>
                  <Icon
                    as={DeleteIcon}
                    name="delete"
                    onClick={() => removeTrackedPlayer(id)}
                  />
                </ListItem>
              ))}
            </List>
          ) : (
            <span>Your tracked player list is empty</span>
          )}
        </Section>
        <Section>
          {player.fetching && <LoadingSpinner />}
          {!fetching &&
            !player.fetching &&
            player.selected &&
            player.profile_success && (
              <PlayerDrawer
                id={player.selected}
                {...player.profiles[player.selected]}
              />
            )}
          {!fetching &&
            !player.fetching &&
            player.selected &&
            player.profile_error && <div>Failed to fetch player stats.</div>}
          {!fetching &&
            !player.fetching &&
            player.selected &&
            player.schedule && (
              <PlayerStatsList
                player={player}
                game={game}
                playerStatsModal={playerStatsModal}
              />
            )}
        </Section>
      </NarrowContainer>
    )
  }
}
