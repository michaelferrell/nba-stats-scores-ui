import //action
"./../actions"

let default_state = {
  fetching: false,
  full: {},
  filtered: {},
  active: null,
  dateFilter: null,
  dateFilterFrom: null,
  dateFilterTo: null
}

export default (state = default_state, action) => {
  const { payload } = action
  switch (action.type) {
    case "FETCH_SCHEDULE_REQUEST":
      return {
        ...state,
        fetching: true
      }
    case "FETCH_SCHEDULE_SUCCESS":
      return {
        ...state,
        fetching: false,
        full: { ...payload.full },
        filtered: { ...payload.filtered },
        active: { ...payload.active },
        dateFilterFrom: payload.dateFilterFrom,
        dateFilterTo: payload.dateFilterTo
      }
    case "FILTER_SCHEDULE_REQUEST":
      return {
        ...state,
        fetching: true
      }
    case "FILTER_SCHEDULE_SUCCESS":
      return {
        ...state,
        fetching: false,
        filtered: { ...payload.filtered }
      }
    case "FILTER_BY_TEAM_REQUEST":
      return {
        ...state,
        fetching: true
      }
    case "FILTER_BY_TEAM_SUCCESS":
      return {
        ...state,
        fetching: false,
        filtered: { ...payload.filtered }
      }
    case "GET_UPCOMING_GAMES":
      return {
        ...state,
        filtered: { ...payload.filtered },
        dateFilterTo: payload.dateFilterTo
      }
    case "GET_PREVIOUS_GAMES":
      return {
        ...state,
        filtered: { ...payload.filtered },
        dateFilterFrom: payload.dateFilterFrom
      }
    case "FILTER_BY_DATE":
      return {
        ...state,
        filtered: { ...payload.filtered },
        dateFilter: payload.dateFilter
      }
    default:
      return state
  }
}
