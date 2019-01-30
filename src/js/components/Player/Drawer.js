import React, { Component } from "react"
import styled from "styled-components"
import { Button, Grid, Dimmer } from "semantic-ui-react"

import { getPlayerHeadshotUrl } from "./../../helpers/getPlayerHeadshotUrl"
import { TEAMS } from "./../../constants/"

const FixedContainer = styled.div`
  position: fixed;
  left: 0;
  top: 52px;
  width: 375px;
  height: 100%;
  border-right: 1px solid #2c2c2c;
  top: 47px;
  padding: 1.5em 2em;
`

const Section = styled.div`
  border-top: 1px solid #333;
  margin-top: .5em;
  padding-top: .5em;
`

const PlayerName = styled.div`
  font-size: 1.3em;
  margin-bottom: .6em;
  color: #c0c0c0;
`

const PlayerInfo = styled.div`
  font-size: 1.1em;
  margin-bottom: .2em;
`

const HeadshotCircle = styled.div`
  background-image: url(${props => props.src});
  background-position: center center;
  background-repeat: no-repeat;
  background-size: 14em;
  border-radius: 50%;
  border: 2px solid #222;
  overflow: hidden;
  width: 11em;
  height: 11em;
  margin-bottom: 1.2em;
`

const PlayerHeadshot = (playerId, teamId) => (
  <HeadshotCircle src={getPlayerHeadshotUrl(playerId, teamId)} />
)

export default class extends Component {
  state = { season_total: null, year: null }

  componentDidMount() {
    const { stats } = this.props
    let season_total = null
    let year = null
    if (stats.season.length > 0) {
      // let latest = stats.season.shift()
      let latest = stats.season[0]
      season_total = latest.total
      year = latest.seasonYear
      this.setState({ season_total, year })
    }
  }

  formatYear = year => {
    let yearTo = year + 1
    yearTo = yearTo.toString().substring(2,4)
    return year + "-" + yearTo
  }

  render() {
    const { id, bio, stats } = this.props
    const { season_total, year } = this.state
    let team = TEAMS[parseInt(bio.team_id)]
    return (
      <FixedContainer>
        <PlayerHeadshot playerId={id} teamId={bio.team_id} />
        <PlayerName>{bio.name}</PlayerName>
        <PlayerInfo>{bio.pos} | {team.city} {team.name}</PlayerInfo>
        <PlayerInfo>Height {bio.height}, weight {bio.weight} lbs</PlayerInfo>
        <PlayerInfo>Born {bio.birthdate}</PlayerInfo>
        <PlayerInfo>Prior: {bio.collegeName}</PlayerInfo>
        {bio.draft && (
          <PlayerInfo>Draft: {bio.draft.seasonYear} Rnd {bio.draft.roundNum} Pick {bio.draft.pickNum}</PlayerInfo>
        )}
        {season_total && (
          <Section>
            <PlayerName>{this.formatYear(year)} Season Stats</PlayerName>
            <PlayerInfo>PPG: {season_total.ppg}</PlayerInfo>
            <PlayerInfo>RPG: {season_total.rpg}</PlayerInfo>
            <PlayerInfo>APG: {season_total.apg}</PlayerInfo>
          </Section>
        )}
      </FixedContainer>
    )
  }
}
