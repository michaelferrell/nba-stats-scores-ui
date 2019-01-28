import React from "react"
import { Icon } from "semantic-ui-react"
import styled from "styled-components"

import { formatDate } from "./../../helpers/formatDate"

const PrimaryLabel = styled.span`
  cursor: pointer;
`

const LabelIcon = styled.i`
  &.icon {
    opacity: 0.7;
    margin-right: 0.4em;
  }
`

const formatLabel = date => {
  const d = formatDate(date)
  return d.day_abbr + ", " + d.month_abbr + " " + d.date
}

export default ({ dateFilter, handleOpen, handleRemove }) =>
  dateFilter ? (
    <PrimaryLabel>
      <Icon as={LabelIcon} name="remove" onClick={handleRemove} />
      <span onClick={handleOpen}>{formatLabel(dateFilter)}</span>
    </PrimaryLabel>
  ) : (
    <PrimaryLabel onClick={handleOpen}>
      <Icon as={LabelIcon} name="calendar alternate outline" />
      Select Date
    </PrimaryLabel>
  )
