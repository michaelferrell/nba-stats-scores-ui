import React, { Component } from "react"
import styled from "styled-components"
import { Button, Grid, Dimmer } from "semantic-ui-react"

import Tab from "./../Tab/"
import PlayerStatsTable from "./../Table/PlayerStatsTable"
import { getPlayerHeadshotUrl } from "./../../helpers/getPlayerHeadshotUrl"
import { TEAMS } from "./../../constants/"

const Section = styled.div`
  border-top: 1px solid #333;
  margin-top: 0.5em;
  padding-top: 0.5em;
`

const PlayerName = styled.div`
  font-size: 2em;
  color: #fff;
  margin-bottom: 0.6em;
`

const PlayerInfo = styled.div`
  font-size: 1.1em;
  margin-bottom: 0.2em;
  color: #fff;
  span {
    color: #999;
  }
`

const PlayerMainInfo = styled.div`
  font-size: 1.3em;
  margin-bottom: 0.4em;
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
  width: 410px;
  @media only screen and (max-width: 520px) {
    width: 100%;
  }
`

const LargeStatBox = styled.div`
  display: inline-block;
  width: 33.3%;
  text-align: center;
  padding: 1em 0;
  color: #fff;
`
const StatName = styled.div`
  font-size: 1em;
  line-height: 1;
  margin-top: 0.4em;
  color: #ddd;
`
const StatValue = styled.div`
  font-size: 2em;
  font-weight: 500;
  line-height: 1;
`
const ScrollHorizontal = styled.div`
  overflow-x: auto;
`

const PlayerHeadshot = (playerId, teamId) => (
  <HeadshotCircle src={getPlayerHeadshotUrl(playerId, teamId)} />
)

export default class extends Component {
  getPerGameStats = data =>
    data.map(item => {
      let { mpg, ppg, fgp, ftp, tpp, rpg, apg, spg, bpg } = item.total
      return [
        { name: "year", value: item.seasonYear },
        { name: "mpg", value: mpg },
        { name: "ppg", value: ppg },
        { name: "fgp", value: fgp + "%" },
        { name: "ftp", value: ftp + "%" },
        { name: "tpp", value: tpp },
        { name: "rpg", value: rpg },
        { name: "apg", value: apg },
        { name: "spg", value: spg },
        { name: "bpg", value: bpg }
      ]
    })

  getSeasonTotalStats = data =>
    data.map(item => {
      let {
        gamesPlayed,
        min,
        points,
        fgm,
        fga,
        fgp,
        tpm,
        tpa,
        tpp,
        ftm,
        fta,
        ftp,
        assists,
        steals,
        blocks,
        totReb,
        pFouls,
        plusMinus
      } = item.total
      return [
        { name: "year", value: item.seasonYear },
        { name: "gp", value: gamesPlayed },
        { name: "min", value: min },
        { name: "pts", value: points },
        { name: "fgm", value: fgm },
        { name: "fga", value: fga },
        { name: "fgp", value: fgp + "%" },
        { name: "tpm", value: tpm },
        { name: "tpa", value: tpa },
        { name: "tpp", value: tpp + "%" },
        { name: "ftm", value: ftm },
        { name: "fta", value: fta },
        { name: "ftp", value: ftp + "%" },
        { name: "reb", value: totReb },
        { name: "ast", value: assists },
        { name: "stl", value: steals },
        { name: "blk", value: blocks },
        { name: "pf", value: pFouls },
        { name: "+/-", value: plusMinus }
      ]
    })

  render() {
    const { id, bio, stats } = this.props
    let team = TEAMS[parseInt(bio.team_id)]
    let draftTeam = null
    if (TEAMS[parseInt(bio.draft.teamId)]) {
      draftTeam = TEAMS[parseInt(bio.draft.teamId)].tricode
    }
    let season_total = null
    let per = null
    let tot = null
    if (stats.season.length > 0) {
      let latest = stats.season[0]
      season_total = latest.total
      per = this.getPerGameStats(stats.season)
      tot = this.getSeasonTotalStats(stats.season)
    }
    return (
      <React.Fragment>
        <Grid>
          <Grid.Row>
            <Grid.Column mobile={16} tablet={4} computer={4}>
              <PlayerHeadshot playerId={id} teamId={bio.team_id} />
            </Grid.Column>
            <Grid.Column mobile={16} tablet={12} computer={12}>
              <PlayerName>{bio.name}</PlayerName>
              <PlayerMainInfo>
                #{bio.jersey} {bio.pos} | {bio.height}, {bio.weight} lbs |{" "}
                {team.city} {team.name}
              </PlayerMainInfo>
              <PlayerInfo>
                <span>Born:</span> {bio.birthdate}
              </PlayerInfo>
              <PlayerInfo>
                <span>Prior:</span> {bio.collegeName}
              </PlayerInfo>
              {draftTeam && (
                <PlayerInfo>
                  <span>Drafted:</span> {bio.draft.seasonYear}: Round{" "}
                  {bio.draft.roundNum}, Pick {bio.draft.pickNum} by {draftTeam}
                </PlayerInfo>
              )}
              {parseInt(bio.yearsPro) > 0 && (
                <PlayerInfo>
                  <span>Years Pro:</span> {bio.yearsPro}
                </PlayerInfo>
              )}
            </Grid.Column>
          </Grid.Row>
          <Grid.Row style={{ padding: "0" }}>
            {season_total && (
              <Grid.Column width={16}>
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
              </Grid.Column>
            )}
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={16}>
              <ScrollHorizontal>
                <Tab
                  panes={[
                    {
                      menuItem: "Per Game",
                      render: () => <PlayerStatsTable data={per} />
                    },
                    {
                      menuItem: "Season Totals",
                      render: () => <PlayerStatsTable data={tot} />
                    }
                  ]}
                />
              </ScrollHorizontal>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </React.Fragment>
    )
  }
}
