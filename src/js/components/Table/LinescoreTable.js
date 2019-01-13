import React from "react"
import { Table } from "semantic-ui-react"
import styled from "styled-components"

import { COLOR } from "./../../constants/"

const StyledTable = styled.table`
  &.ui.table {
    margin-top: 0;
    margin-bottom: 3px;
    background-color: inherit;
    width: auto;
    color: ${COLOR.white};
    thead th {
      color: ${COLOR.white};
      background-color: inherit;
    }
    tr td {
      border-color: none !important;
    }
    td,
    thead th {
      padding-top: 0.5em;
      padding-bottom: 0.5em;
    }
  }
`

const RedCell = styled.td`
  border-right: 4px solid ${COLOR.red} !important;
`

const OrangeCell = styled.td`
  border-right: 4px solid ${COLOR.orange} !important;
`

export default () => (
  <Table as={StyledTable}>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell />
        <Table.HeaderCell>1st</Table.HeaderCell>
        <Table.HeaderCell>2nd</Table.HeaderCell>
        <Table.HeaderCell>3rd</Table.HeaderCell>
        <Table.HeaderCell>4th</Table.HeaderCell>
        <Table.HeaderCell>T</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      <Table.Row>
        <Table.Cell as={RedCell}>OKC</Table.Cell>
        <Table.Cell>31</Table.Cell>
        <Table.Cell>50</Table.Cell>
        <Table.Cell>39</Table.Cell>
        <Table.Cell>12</Table.Cell>
        <Table.Cell>120</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell as={OrangeCell}>HOU</Table.Cell>
        <Table.Cell>31</Table.Cell>
        <Table.Cell>50</Table.Cell>
        <Table.Cell>39</Table.Cell>
        <Table.Cell>12</Table.Cell>
        <Table.Cell>120</Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table>
)
