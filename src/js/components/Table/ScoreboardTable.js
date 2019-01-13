import React from "react"
import { Table, Icon } from "semantic-ui-react"
import styled from "styled-components"

import TeamLogo from "./../Game/TeamLogo"

import { isNBATeam } from "./../../helpers/isNBATeam"

const StyledTable = styled.table`
  &.ui.table {
    margin-top: 0;
    margin-bottom: 3px;
    border-radius: ${props => {
      if (props.away) {
        return "4px 4px 0 0"
      } else if (props.home) {
        return "0 0 4px 4px"
      }
    }};
  }
`

const LargeText = styled.span`
  font-size: ${props => (props.size === "large" ? "1.6em" : "1.2em")};
  @media (max-width: 500px) {
    font-size: 1em;
  }
  font-weight: 500;
  position: relative;
`

const SmallText = styled.span`
  font-size: ${props => (props.size === "large" ? "1em" : "0.75em")};
  @media (max-width: 500px) {
    font-size: 0.8em;
  }
  opacity: 0.5;
  margin-left: 1em;
`

const LeftPadding = styled.td`
  padding-left: 1.15em !important;
`

const RightPadding = styled.td`
  padding-right: 1.15em !important;
`

const CaretIcon = styled.i`
  position: absolute;
  right: -26px;
  top: 1px;
  color: #666;
`

export default ({
  as,
  id,
  name,
  score,
  record,
  highlighted,
  away,
  home,
  size,
  logoSize,
  scoreTextAlign = "left",
  hideWinnerIcon
}) => (
  <Table
    as={as || StyledTable}
    unstackable
    inverted
    highlighted={highlighted}
    away={away}
    home={home}
  >
    <Table.Body>
      <Table.Row>
        <Table.Cell as={LeftPadding} width={3}>
          {isNBATeam(id) && <TeamLogo name={name} size={logoSize} />}
        </Table.Cell>
        <Table.Cell>
          <LargeText size={size}>{name}</LargeText>
          <SmallText size={size}>
            {record ? "(" + record + ")" : null}
          </SmallText>
        </Table.Cell>
        <Table.Cell as={RightPadding} textAlign={scoreTextAlign}>
          <LargeText size={size}>
            {score}
            {highlighted &&
              score &&
              !hideWinnerIcon && <Icon as={CaretIcon} name="caret left" />}
          </LargeText>
        </Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table>
)
