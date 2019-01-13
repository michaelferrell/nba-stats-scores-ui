import React from "react"
import { Icon } from "semantic-ui-react"
import styled from "styled-components"

const PrimaryLabel = styled.span``

const SecondaryLabel = styled.span`
  opacity: 0.65;
`

const LabelIcon = styled.i`
  &.icon {
    opacity: 0.7;
    margin-right: 0.4em;
  }
`

export default ({ label }) => (
  <span>
    <PrimaryLabel>
      <Icon as={LabelIcon} name="calendar alternate outline" />
      {label}
    </PrimaryLabel>
  </span>
)
