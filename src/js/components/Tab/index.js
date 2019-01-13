import React from "react"
import { Tab } from "semantic-ui-react"
import styled from "styled-components"

import { COLOR } from "./../../constants/"

const StyledTab = styled.div`
  &.ui.secondary.menu {
    margin-bottom: 2.5rem;
    border-bottom-color: ${COLOR.mineshaft} !important;
  }
  &.ui.secondary.menu .item {
    margin-right: 2em;
  }
  &.ui.secondary.inverted.pointing.menu .active.item {
    border-color: ${COLOR.blue};
    color: ${COLOR.blue} !important;
  }
  @media (max-width: 767px) {
    &.ui.secondary.menu .item {
      margin-right: 1em;
    }
  }
  @media (max-width: 500px) {
    &.ui.secondary.menu {
      width: 100%;
      overflow-y: auto;
    }
    &.ui.secondary.menu .item {
      margin-right: 0;
    }
  }
`

export default ({ panes }) => (
  <Tab
    menu={{
      as: StyledTab,
      secondary: true,
      pointing: true,
      inverted: true
    }}
    panes={panes}
  />
)