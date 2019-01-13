import React from "react"
import { Dropdown } from "semantic-ui-react"
import styled from "styled-components"

const StyledDropdown = styled.div`
  @media only screen and (max-width: 767px) {
    &.ui.scrolling.dropdown .menu {
      max-height: 18rem;
    }
  }
`

export default ({ options, onChange, defaultValue }) => (
  <Dropdown
    as={StyledDropdown}
    options={options}
    scrolling
    onChange={onChange}
    defaultValue={defaultValue}
  />
)
