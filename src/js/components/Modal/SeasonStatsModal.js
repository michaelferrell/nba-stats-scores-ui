import React, { Component } from "react"
import { Grid, Modal, Table } from "semantic-ui-react"
import styled, { css } from "styled-components"

// import TeamStandingsTable from "./../Table/TeamStandingsTable"
// import LoadingSpinner from "./../Spinner/LoadingSpinner"
// import Tab from "./../Tab/"

import { COLOR } from "./../../constants/"

const StyledModalHeader = styled.div`
  &.header {
    padding-top: 0 !important;
  }
`

const SectionTitle = styled.h3`
  color: ${COLOR.silver};
`

export default class extends Component {
  // componentDidMount() {
  //   const { standings, fetchTeamStandings } = this.props
  //   if (!standings) {
  //     fetchTeamStandings()
  //   }
  // }
  render() {
    const { handleClose } = this.props
    return (
      <Modal
        open={true}
        basic
        inverted
        closeIcon
        onClose={handleClose}
        size="large"
        centered={false}
      >
        <Modal.Header as={StyledModalHeader}>Season Stats</Modal.Header>
          <Modal.Content>
            some season stats
          </Modal.Content>
      </Modal>
    )
  }
}
