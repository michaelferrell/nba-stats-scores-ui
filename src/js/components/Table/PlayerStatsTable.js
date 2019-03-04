import React from "react"
import { Grid, Table } from "semantic-ui-react"
import styled from "styled-components"

const StyledTable = styled.table`
  &.ui.inverted.table {
    margin-bottom: 2em;
    background-color: inherit;
  }
`

export default ({ data }) => {
  let headers = data[0].map(stat => stat.name)
  return (
    <Table as={StyledTable} unstackable inverted>
      <thead>
        <Table.Row>
          {headers.map(name => (
            <Table.HeaderCell key={name}>{name}</Table.HeaderCell>
          ))}
        </Table.Row>
      </thead>
      <tbody>
        {data.map((stats, idx) => (
          <Table.Row key={idx}>
            {stats.map(stat => (
              <Table.Cell key={stat.name}>{stat.value}</Table.Cell>
            ))}
          </Table.Row>
        ))}
      </tbody>
    </Table>
  )
}
