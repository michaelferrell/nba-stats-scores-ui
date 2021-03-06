import //action
"./../actions"

let default_state = {
  fetching: false,
  full: {},
  filtered: {},
  playoffs: [],
  active: null,
  dateFilter: null,
  dateFilterFrom: null,
  dateFilterTo: null,
  summerleague: {
    schedule: {},
    fetching: false
  }
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
        playoffs: [...payload.playoffs],
        active: { ...payload.active },
        dateFilterFrom: payload.dateFilterFrom,
        dateFilterTo: payload.dateFilterTo
      }
    case "GET_SCHEDULE_SUCCESS":
      return {
        ...state,
        fetching: false,
        full: { ...payload.full },
        filtered: { ...payload.filtered },
        active: { ...payload.active },
        dateFilter: payload.dateFilter,
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
    case "REMOVE_FILTER_BY_DATE":
      return {
        ...state,
        dateFilter: null
      }
    case "FETCH_SUMMER_LEAGUE_REQUEST":
      return {
        ...state,
        summerleague: {
          ...state.summerleague,
          fetching: true
        }
      }
    case "FETCH_SUMMER_LEAGUE_SUCCESS":
      return {
        ...state,
        summerleague: {
          schedule: {...payload},
          fetching: false
        }
      }
    case "FETCH_SUMMER_LEAGUE_ERROR":
      return {
        ...state,
        summerleague: {
          schedule: {},
          fetching: false
        }
      }
    default:
      return state
  }
}
