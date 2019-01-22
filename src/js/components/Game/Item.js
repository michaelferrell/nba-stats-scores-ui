import React from "react"
import { Card, Table } from "semantic-ui-react"
import styled from "styled-components"

import ScoreboardTable from "./../Table/ScoreboardTable"
import ProgressSpinner from "./../Spinner/ProgressSpinner"

import { displayGameDate } from "./../../helpers/displayGameDate"
import { COLOR } from "./../../constants/"

const StyledCard = styled.div`
  &.ui.card {
    cursor: ${props => (props.final ? "pointer" : null)};
    background-color: inherit;
    box-shadow: none;
    border-bottom: 1px solid #312f2f;
    border-radius: 0 !important;
    border-right: ${props => !props.oddNumber && "1px solid #312f2f"};
    &:hover {
      background-color: #1f1e1e;
    }
  }
  &.ui.card > .content {
    padding-top: 1em;
    padding-bottom: 1em;
  }
  @media (max-width: 500px) {
    &.ui.card {
      border: 0;
      &:hover {
        background-color: inherit;
      }
    }
    &.ui.card > .content {
      padding-left: 0;
      padding-right: 0;
    }
  }
`

const CardTitle = styled.div`
  display: inline-block;
  float: left;
  font-size: 0.9em;
  margin-bottom: 0.5em;
`

const ProgressText = styled.span`
  color: #21ba45;
  font-weight: bold;
`

const SecondaryText = styled.span`
  opacity: 0.6;
`

const TvStationLabel = styled.div`
  float: right;
  display: inline-block;
  color: ${COLOR.dustygray};
  border-radius: 4px;
  border: 1px solid #464646;
  background-color: rgba(0, 0, 0, 0.1);
  padding: 0 0.5em;
  font-size: 0.7em;
  margin-left: 0.5em;
`

export default ({ game, oddNumber, handleClick }) => (
  <Card
    fluid
    oddNumber={oddNumber}
    as={StyledCard}
    final={game.status === "final"}
    onClick={() =>
      game.status === "final" && handleClick ? handleClick(game) : null
    }
  >
    <Card.Content>
      {game.period ? (
        <CardTitle>
          <ProgressText>
            {game.is_end_of_period && game.is_halftime ? (
              "Halftime"
            ) : game.is_end_of_period && !game.is_halftime ? (
              "End of " + game.period
            ) : !game.is_end_of_period ? (
              <span>
                {game.period} {game.clock ? "- " + game.clock : null}
              </span>
            ) : null}
          </ProgressText>
          <ProgressSpinner />
        </CardTitle>
      ) : (
        <CardTitle>
          {game.status === "final" ? (
            <span>Final - </span>
          ) : game.status === "upcoming" ? (
            <span>{game.time} - </span>
          ) : null}
          <SecondaryText>{displayGameDate(game.date)}</SecondaryText>
        </CardTitle>
      )}
      {game.status !== "final" &&
        game.tv &&
        game.tv.map(k => (
          <TvStationLabel key={k.channel}>{k.channel}</TvStationLabel>
        ))}
      <ScoreboardTable
        id={game.visitor_team.id}
        name={game.visitor_team.name}
        score={game.score ? game.score.visitor_team : null}
        record={game.status !== "upcoming" ? game.visitor_team.record : null}
        highlighted={
          game.score &&
          game.status === "final" &&
          game.score.visitor_team > game.score.home_team
        }
        scoreTextAlign="right"
        logoSize="small"
        away={true}
      />
      <ScoreboardTable
        id={game.home_team.id}
        name={game.home_team.name}
        score={game.score ? game.score.home_team : null}
        record={game.status !== "upcoming" ? game.home_team.record : null}
        highlighted={
          game.score &&
          game.status === "final" &&
          game.score.home_team > game.score.visitor_team
        }
        scoreTextAlign="right"
        logoSize="small"
        home={true}
      />
    </Card.Content>
  </Card>
)
