import React, { Component } from "react"
import { Grid } from "semantic-ui-react"
import styled, { css } from "styled-components"

import { COLOR, TEAMS } from "./../../constants/"

const StyledGrid = styled.div`
  &.ui.grid > .row > .column {
    margin-bottom: 0.5em;
    border-right: 1px solid #2a2a2a;
  }
  &.ui.grid > .row > .column:last-child {
    border-right: 0;
  }
  @media (max-width: 500px) {
    &.ui.grid > .row > .column {
      width: 100% !important;
    }
  }
`

const SectionHeading = styled.h3`
  margin-bottom: 2em;
  color: ${COLOR.silver};
`

const ColumnHeading = styled.h4`
  font-size: 1.1em;
`

const StatColumn = styled.div`
  &.column {
    width: 100% !important;
  }
  @media (max-width: 500px) {
    &.column {
      width: 50% !important;
      margin-bottom: 2em !important;
    }
  }
  @media (max-width: 300px) {
    &.column {
      width: 100% !important;
    }
  }
`

const PlayerName = styled.div`
  font-size: 1em;
  background-color: ${COLOR.mineshaft};
  background-color: #222;
  border-radius: 3px;
  padding: 0.1em 0.3em;
`

const PlayerNameLarge = styled.div`
  font-size: 1.3em;
  @media (max-width: 500px) {
    margin-bottom: 0.3em;
  }
`

const PlayerCity = styled.div`
  font-size: 0.9em;
  opacity: 0.5;
  margin-bottom: 0.7em;
`

const Stat = css`
  font-size: 1.2em;
  font-weight: bold;
  margin-top: 0.2em;
`
const StatValue = styled.div`
  ${Stat};
`

const StatValueLarge = styled.div`
  ${Stat};
  margin-bottom: 0.5em;
  font-size: 1.1em;
  opacity: 0.9;
`
const PlaceholderImage = styled.div`
  width: 84px;
  height: 84px;
  // background-color: #ddd;
  border: 2px solid #222;
  border-radius: 50%;
  margin: 1em auto 0.5em;
`

const getPlayerHeadshotUrl = ({ playerId, teamId }) =>
  "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/" +
  teamId +
  "/2018/260x190/" +
  playerId +
  ".png"

const LargeHeadshot = styled.img`
  border: 2px solid #222;
  border-radius: 3px;
  margin-bottom: 2em;
`

const SmallHeadshot = styled.div`
  background-image: url(${props => props.src});
  background-position: center center;
  background-repeat: no-repeat;
  background-size: 8em;
  border-radius: 50%;
  border: 2px solid #222;
  overflow: hidden;
  width: 6em;
  height: 6em;
  margin: 1em auto 0.5em;
  text-align: center;
`

const PlayerHeadshot = (playerId, teamId) => (
  <SmallHeadshot src={getPlayerHeadshotUrl(playerId, teamId)} />
)

const LargePlayerHeadshot = (playerId, teamId) => (
  <LargeHeadshot src={getPlayerHeadshotUrl(playerId, teamId)} />
)

const PlayerOfTheGame = ({ player }) => (
  <Grid>
    <Grid.Row>
      <Grid.Column mobile={7} tablet={10} computer={10}>
        <LargePlayerHeadshot
          playerId={player.personId}
          teamId={player.teamId}
        />
      </Grid.Column>
      <Grid.Column mobile={9} tablet={6} computer={6}>
        <PlayerNameLarge>{player.name}</PlayerNameLarge>
        <PlayerCity>{player.city}</PlayerCity>
        <StatValueLarge>{player.points} Points</StatValueLarge>
        <StatValueLarge>{player.totReb} Rebounds</StatValueLarge>
        <StatValueLarge>{player.assists} Assists</StatValueLarge>
      </Grid.Column>
    </Grid.Row>
  </Grid>
)

export default ({ stats, players }) => {
  const h_leader = stats.home_team.leaders
  // value
  const h_ast = h_leader.assists.value
  const h_pts = h_leader.points.value
  const h_reb = h_leader.rebounds.value
  // personid
  const h_ast_leader = h_leader.assists.players[0].personId
  const h_pts_leader = h_leader.points.players[0].personId
  const h_reb_leader = h_leader.rebounds.players[0].personId

  const v_leader = stats.visitor_team.leaders
  // value
  const v_ast = v_leader.assists.value
  const v_pts = v_leader.points.value
  const v_reb = v_leader.rebounds.value
  // personid
  const v_ast_leader = v_leader.assists.players[0].personId
  const v_pts_leader = v_leader.points.players[0].personId
  const v_reb_leader = v_leader.rebounds.players[0].personId
  // calculate leaders
  const ast_leader = v_ast > h_ast ? v_ast_leader : h_ast_leader
  const pts_leader = v_pts > h_pts ? v_pts_leader : h_pts_leader
  const reb_leader = v_reb > h_reb ? v_reb_leader : h_reb_leader
  // player of the game
  const player_of_the_game = stats.playerOfTheGame
  return (
    <Grid>
      <Grid.Row>
        {player_of_the_game && (
          <Grid.Column mobile={16} tablet={8} computer={8}>
            <SectionHeading>Player of the Game</SectionHeading>
            <PlayerOfTheGame player={player_of_the_game} />
          </Grid.Column>
        )}
        <Grid.Column
          // if player of the game section exists, use 8 width column
          mobile={16}
          tablet={player_of_the_game ? 8 : 12}
          computer={player_of_the_game ? 8 : 12}
        >
          <SectionHeading>Game Leaders</SectionHeading>
          <Grid columns={3} as={StyledGrid}>
            <Grid.Row>
              <Grid.Column textAlign="center">
                <ColumnHeading>Points</ColumnHeading>
                <Grid>
                  <Grid.Row>
                    <Grid.Column as={StatColumn}>
                      {players[h_pts_leader] ? (
                        <PlayerHeadshot
                          playerId={h_pts_leader}
                          teamId={players[h_pts_leader].team_id}
                        />
                      ) : (
                        <PlaceholderImage />
                      )}
                      <PlayerName>
                        {players[h_pts_leader]
                          ? players[h_pts_leader].name
                          : h_leader.points.players[0].firstName}
                      </PlayerName>
                      <StatValue>{h_pts}</StatValue>
                    </Grid.Column>
                    <Grid.Column as={StatColumn}>
                      {players[v_pts_leader] ? (
                        <PlayerHeadshot
                          playerId={v_pts_leader}
                          teamId={players[v_pts_leader].team_id}
                        />
                      ) : (
                        <PlaceholderImage />
                      )}
                      <PlayerName>
                        {players[v_pts_leader]
                          ? players[v_pts_leader].name
                          : v_leader.points.players[0].firstName}
                      </PlayerName>
                      <StatValue>{v_pts}</StatValue>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Grid.Column>
              <Grid.Column textAlign="center">
                <ColumnHeading>Assists</ColumnHeading>
                <Grid>
                  <Grid.Row>
                    <Grid.Column as={StatColumn}>
                      {players[h_ast_leader] ? (
                        <PlayerHeadshot
                          playerId={h_ast_leader}
                          teamId={players[h_ast_leader].team_id}
                        />
                      ) : (
                        <PlaceholderImage />
                      )}
                      <PlayerName>
                        {players[h_ast_leader]
                          ? players[h_ast_leader].name
                          : h_leader.assists.players[0].firstName}
                      </PlayerName>
                      <StatValue>{h_ast}</StatValue>
                    </Grid.Column>
                    <Grid.Column as={StatColumn}>
                      {players[v_ast_leader] ? (
                        <PlayerHeadshot
                          playerId={v_ast_leader}
                          teamId={players[v_ast_leader].team_id}
                        />
                      ) : (
                        <PlaceholderImage />
                      )}
                      <PlayerName>
                        {players[v_ast_leader]
                          ? players[v_ast_leader].name
                          : v_leader.assists.players[0].firstName}
                      </PlayerName>
                      <StatValue>{v_ast}</StatValue>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Grid.Column>
              <Grid.Column textAlign="center">
                <ColumnHeading>Rebounds</ColumnHeading>
                <Grid>
                  <Grid.Row>
                    <Grid.Column as={StatColumn}>
                      {players[h_reb_leader] ? (
                        <PlayerHeadshot
                          playerId={h_reb_leader}
                          teamId={players[h_reb_leader].team_id}
                        />
                      ) : (
                        <PlaceholderImage />
                      )}
                      <PlayerName>
                        {players[h_reb_leader]
                          ? players[h_reb_leader].name
                          : h_leader.rebounds.players[0].firstName}
                      </PlayerName>
                      <StatValue>{h_reb}</StatValue>
                    </Grid.Column>
                    <Grid.Column as={StatColumn}>
                      {players[v_reb_leader] ? (
                        <PlayerHeadshot
                          playerId={v_reb_leader}
                          teamId={players[v_reb_leader].team_id}
                        />
                      ) : (
                        <PlaceholderImage />
                      )}
                      <PlayerName>
                        {players[v_reb_leader]
                          ? players[v_reb_leader].name
                          : v_leader.rebounds.players[0].firstName}
                      </PlayerName>
                      <StatValue>{v_reb}</StatValue>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}
