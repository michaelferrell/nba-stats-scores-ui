import React, { Component } from "react"
import { Button, Dropdown, Icon, Grid, Modal } from "semantic-ui-react"
import styled, { css } from "styled-components"

import { COLOR } from "./../../constants/"

const StyledModalHeader = styled.div`
  &.header {
    padding-top: 0 !important;
  }
`

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
  margin: 0 0 .5em;
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
    margin-left: .5em;
    cursor: pointer;
    opacity: .6;
    font-size: .9em;
  }
`

const PrimaryButton = styled.button`
  &.ui.button {
    margin-left: .4em;
  }
  &.ui.disabled.button,
  &.ui.button:disabled {
    opacity: .7 !important;
  }
  &.ui.disabled.button,
  &.ui.button:disabled,
  &.ui.disabled.button:hover,
  &.ui.disabled.active.button {
    pointer-events: auto !important;
    cursor: not-allowed !important;
    background-color: #2185D0 !important;
    opacity: .7 !important;
  }

`

export default class extends Component {
  state = { playerId: null }

  componentDidMount() {
    const { player, fetchTrackedPlayers } = this.props
    if (player.tracked.length === 0) {
      fetchTrackedPlayers()
    }
  }

  formatPlayerOptions = (players, tracked) =>
    Object.keys(players).map(id => ({
      key: id,
      value: id,
      text: players[id].name,
      team_id: players[id].team_id,
      disabled: tracked.indexOf(id) > -1
    }))

  render() {
    const {
      handleClose,
      player,
      trackPlayer,
      fetchPlayerProfile,
      removeTrackedPlayer,
      fetchPlayerSchedule
    } = this.props
    const { playerId } = this.state
    return (
      <Modal
        open={true}
        basic
        inverted
        closeIcon
        onClose={handleClose}
        size="large"
        centered={false}
        closeOnDimmerClick={false}
        closeOnEscape={false}
      >
        <Modal.Header as={StyledModalHeader}>Player Tracker</Modal.Header>
        <Modal.Content>
          Monitor the stats of your favorite NBA players!
          <Section>
            <StyledDropdown>
              <Dropdown
                placeholder="Search players"
                search
                selection
                options={this.formatPlayerOptions(player.list, player.tracked)}
                onChange={(e, { value }) => {
                  this.setState({ playerId: value })
                }}
                value={playerId}
              />
              <Button
                as={PrimaryButton}
                primary
                content="Add"
                disabled={!playerId}
                onClick={() => {
                  trackPlayer(playerId)
                  this.setState({ playerId: null })
                }}
              />
            </StyledDropdown>
            </Section>
            <Section>
              <h4>Tracked Players:</h4>
              {player.tracked.length > 0 ? (
                <List>
                  {player.tracked.map(id => (
                    <ListItem key={id}>
                      <ListItemText onClick={() => {
                        fetchPlayerSchedule(id)
                        fetchPlayerProfile(id)
                        handleClose()
                      }}>
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
        </Modal.Content>
      </Modal>
    )
  }
}
