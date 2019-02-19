import React, { Component } from "react"
import styled from "styled-components"
import { Button, Grid, Dimmer } from "semantic-ui-react"

import { getPlayerHeadshotUrl } from "./../../helpers/getPlayerHeadshotUrl"
import { TEAMS } from "./../../constants/"

const FixedContainer = styled.div`
  // position: fixed;
  // left: 0;
  // top: 52px;
  // width: 425px;
  // height: 100%;
  // border-right: 1px solid #2c2c2c;
  // top: 47px;
  padding: 1.5em 2em;
`

const Section = styled.div`
  border-top: 1px solid #333;
  margin-top: .5em;
  padding-top: .5em;
`

const PlayerName = styled.div`
  font-size: 2em;
  color: #fff;
  margin-bottom: .6em;
`

const PlayerInfo = styled.div`
  font-size: 1.1em;
  margin-bottom: .2em;
  color: #fff;
  span {
    color: #999;
  }
`

const PlayerMainInfo = styled.div`
  font-size: 1.3em;
  margin-bottom: .4em;
  color: #fff;
`

const HeadshotCircle = styled.div`
  background-image: url(${props => props.src});
  background-position: center bottom;
  background-repeat: no-repeat;
  background-size: 14em;
  border-radius: 3px;
  background-color: #333;
  overflow: hidden;
  width: 11em;
  height: 11em;
  margin-bottom: 1.2em;

`

const StatContainer = styled.div`
  border: 1px solid #626262;
  margin-top: 1em;
  width: 410px;
`

const LargeStatBox = styled.div`
  display: inline-block;
  width: 33.3%;
  text-align: center;
  padding: 1.8em 0;
  color: #fff;
`
const StatName = styled.div`
  font-size: 1.1em;
  font-weight: 600;
  line-height: 1;
  margin-top: 0.4em;
  color: #ddd;
`
const StatValue = styled.div`
  font-size: 2.4em;
  font-weight: 500;
  line-height: 1;
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
    let draftTeam = TEAMS[parseInt(bio.draft.teamId)].tricode

    let dog = 'okay'
    return (
      <FixedContainer>
        <Grid>
          <Grid.Row>
            <Grid.Column width={4}>
              <PlayerHeadshot playerId={id} teamId={bio.team_id} />
            </Grid.Column>
            <Grid.Column width={12}>
              <PlayerName>{bio.name}</PlayerName>
              <PlayerMainInfo>#{bio.jersey} {bio.pos} | {bio.height}, {bio.weight} lbs | {team.city} {team.name}</PlayerMainInfo>
              <PlayerInfo><span>Born:</span> {bio.birthdate}</PlayerInfo>
              <PlayerInfo><span>Prior:</span> {bio.collegeName}</PlayerInfo>
              <PlayerInfo><span>Drafted:</span> {bio.draft.seasonYear}: Round {bio.draft.roundNum}, Pick {bio.draft.pickNum} by {draftTeam}</PlayerInfo>
              {parseInt(bio.yearsPro) > 0 && (
                <PlayerInfo>
                  <span>Years Pro:</span> {bio.yearsPro}
                </PlayerInfo>
              )}
            </Grid.Column>
          </Grid.Row>
        </Grid>
        {season_total && (
          <React.Fragment>
            <StatContainer>
            <LargeStatBox first>
              <StatValue>{season_total.ppg}</StatValue>
              <StatName>PPG</StatName>
            </LargeStatBox>
            <LargeStatBox>
              <StatValue>{season_total.rpg}</StatValue>
              <StatName>RPG</StatName>
            </LargeStatBox>
            <LargeStatBox>
              <StatValue>{season_total.apg}</StatValue>
              <StatName>APG</StatName>
            </LargeStatBox>
            </StatContainer>
          </React.Fragment>
        )}
      </FixedContainer>
    )
  }
}
