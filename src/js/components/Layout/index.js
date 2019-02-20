import styled from "styled-components"

export const NarrowContainer = styled.div`
  max-width: 800px;
  padding: 1em 2em;
  margin: 0 auto;
`

export const MainGrid = styled.div`
  border: 1px solid #312f2f;
  margin-top: 1em !important;
  margin-top: 0.5em !important;
  margin-bottom: 0 !important;
  @media (max-width: 500px) {
    border: 0;
    &.ui.grid > .row > .column {
      width: 100% !important;
    }
  }
`

export const UnpaddedRow = styled.div`
  padding-top: 0 !important;
  padding-bottom: 0 !important;
`

export const UnpaddedColumn = styled.div`
  padding-left: 0 !important;
  padding-right: 0 !important;
`

