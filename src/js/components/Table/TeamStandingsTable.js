import React from "react"
import { Table } from "semantic-ui-react"
import styled from "styled-components"

import TeamLogo from "./../Game/TeamLogo"

import { TEAMS } from "./../../constants/"

const StyledTable = styled.table`
  &.ui.inverted.table {
    margin-bottom: 2em;
    background-color: inherit;
  }
`

const RowHover = styled.tr`
  &:hover td {
    background-color: #444;
  }
`

const ImageContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
  margin-right: 0.6em;
  margin-left: 1.2em;
`

export default ({ data }) => (
  <Table as={StyledTable} unstackable inverted>
    <thead>
      <Table.Row>
        <Table.HeaderCell>Team</Table.HeaderCell>
        <Table.HeaderCell textAlign="center">Wins</Table.HeaderCell>
        <Table.HeaderCell textAlign="center">Losses</Table.HeaderCell>
        <Table.HeaderCell textAlign="center">Win Pct</Table.HeaderCell>
        <Table.HeaderCell textAlign="center">GB</Table.HeaderCell>
        <Table.HeaderCell textAlign="center">Last 10</Table.HeaderCell>
        <Table.HeaderCell textAlign="center">Strk</Table.HeaderCell>
      </Table.Row>
    </thead>
    <tbody>
      {data.map((key, idx) => {
        return (
          <Table.Row key={key.teamId} as={RowHover}>
            <Table.Cell verticalAlign="middle">
              {idx + 1}
              <ImageContainer>
                <TeamLogo name={TEAMS[key.teamId].name} size={20} />
              </ImageContainer>
              {TEAMS[key.teamId].name}
            </Table.Cell>
            <Table.Cell textAlign="center">{key.win}</Table.Cell>
            <Table.Cell textAlign="center">{key.loss}</Table.Cell>
            <Table.Cell textAlign="center">{key.winPct}</Table.Cell>
            <Table.Cell textAlign="center">{key.gamesBehind}</Table.Cell>
            <Table.Cell textAlign="center">
              {key.lastTenWin}-{key.lastTenLoss}
            </Table.Cell>
            <Table.Cell textAlign="center">{key.streak}</Table.Cell>
          </Table.Row>
        )
      })}
    </tbody>
  </Table>
)
