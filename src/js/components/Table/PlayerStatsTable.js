import React from "react"
import { Grid, Table } from "semantic-ui-react"
import styled from "styled-components"

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

const SecondaryStat = styled.span`
  opacity: 0.5;
  font-size: 0.95em;
  margin-left: 0.2em;
`

const StatItem = styled.div`
  &.column {
    text-align: center;
    margin-right: 1em;
    width: auto !important;
  }
`

const StatName = styled.h4`
  font-size: 1.1em;
`

const StatValue = styled.div`
  font-size: 1em;
  font-weight: bold;
  margin-top: 0.2em;
`

export default ({ data }) => {
  console.log('data',data)
  return (
    <Grid>
      <Grid.Row>
        <Grid.Column as={StatItem}>
          <StatName>Fg</StatName>
          <StatValue>{data.fgm}/{data.fga}</StatValue>
        </Grid.Column>
        <Grid.Column as={StatItem}>
          <StatName>Fg%</StatName>
          <StatValue>{data.fgp}</StatValue>
        </Grid.Column>
        <Grid.Column as={StatItem}>
          <StatName>Ft</StatName>
          <StatValue>{data.ftm}/{data.fta}</StatValue>
        </Grid.Column>
        <Grid.Column as={StatItem}>
          <StatName>Ft%</StatName>
          <StatValue>{data.ftp}</StatValue>
        </Grid.Column>
        <Grid.Column as={StatItem}>
          <StatName>3p</StatName>
          <StatValue>{data.tpm}/{data.tpa}</StatValue>
        </Grid.Column>
        <Grid.Column as={StatItem}>
          <StatName>3p%</StatName>
          <StatValue>{data.tpp}</StatValue>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column as={StatItem}>
          <StatName>Reb</StatName>
          <StatValue>{data.totReb}</StatValue>
        </Grid.Column>
        <Grid.Column as={StatItem}>
          <StatName>Off Reb</StatName>
          <StatValue>{data.offReb}</StatValue>
        </Grid.Column>
        <Grid.Column as={StatItem}>
          <StatName>Def Reb</StatName>
          <StatValue>{data.defReb}</StatValue>
        </Grid.Column>
        <Grid.Column as={StatItem}>
          <StatName>Blk</StatName>
          <StatValue>{data.blocks}</StatValue>
        </Grid.Column>
        <Grid.Column as={StatItem}>
          <StatName>Stl</StatName>
          <StatValue>{data.steals}</StatValue>
        </Grid.Column>
        <Grid.Column as={StatItem}>
          <StatName>Min</StatName>
          <StatValue>{data.min}</StatValue>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}
