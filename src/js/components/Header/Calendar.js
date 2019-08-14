import React from "react"
import { Icon, Popup } from "semantic-ui-react"
import styled from "styled-components"
import Calendar from "react-calendar"

import { COLOR } from "./../../constants/"

const StyledCalendar = styled.div`
  .react-calendar {
    background-color: #f9fafb;
    border-radius: 4px;
    border: 0;
  }
  @media (max-width: 500px) {
    .react-calendar {
      width: 100%;
    }
  }
  .react-calendar__tile {
    border-right: 1px solid rgba(34, 36, 38, 0.1) !important;
    border-bottom: 1px solid rgba(34, 36, 38, 0.1) !important;
    background-color: #fff;
  }
  .react-calendar__month-view__days__day--weekend {
    color: ${COLOR.mineshaft};
  }
  .react-calendar__month-view__weekdays__weekday {
    background-color: #f9fafb;
    color: ${COLOR.mineshaft};
    font-weight: bold;
  }
  .react-calendar__tile--active {
    background-color: #e0e0e0 !important;
    color: ${COLOR.mineshaft} !important;
  }
  .react-calendar__month-view__days__day--neighboringMonth {
    color: ${COLOR.silver} !important;
  }
  .react-calendar__navigation button[disabled] {
    display: none !important;
  }
  .react-calendar__navigation button:enabled:focus,
  .react-calendar__navigation button:enabled:hover {
    background-color: #f5f5f5 !important;
    border-radius: 4px;
  }
`

const ICON_SIZE = 20
const CloseIcon = styled.i`
  position: absolute;
  top: ${-ICON_SIZE - 10}px;
  right: 0;
  color: ${COLOR.silver};
  font-size: 1.4em;
  height: ${ICON_SIZE}px;
  width: ${ICON_SIZE}px;
  cursor: pointer;
`

const minDate = new Date("8/1/19")
const maxDate = new Date("6/30/20")

export default ({ handleChange, handleClose, open, value, trigger }) => (
  <Popup basic on="click" position="bottom left" open={open} trigger={trigger}>
    <Icon as={CloseIcon} onClick={handleClose} name="close" />
    <StyledCalendar>
      <Calendar
        onChange={handleChange}
        value={value}
        maxDate={maxDate}
        minDate={minDate}
        nextLabel={<Icon name="angle right" />}
        prevLabel={<Icon name="angle left" />}
      />
    </StyledCalendar>
  </Popup>
)
