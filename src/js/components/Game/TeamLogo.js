import React from "react"
import styled from "styled-components"

const TeamLogo = styled.img`
  max-width: ${props => props.size === "small" && "35px"};
  max-width: ${props => {
    if (props.size === "small") {
      return "35px"
    } else if (props.size && typeof props.size === "number") {
      return props.size + "px"
    }
  }};
`

export default ({ name, size = false }) => (
  <TeamLogo
    size={size}
    src={
      "http://heroflicks.com/nba/images/" +
      name.replace(" ", "").toLowerCase() +
      ".png"
    }
  />
)
