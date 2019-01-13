const default_state = {
  selected: null,
  boxscore: null,
  article: null
}

export default (state = default_state, action) => {
  const { payload } = action
  switch (action.type) {
    case "FETCH_BOXSCORE_SUCCESS":
      return {
        ...state,
        selected: { ...payload.game },
        boxscore: { ...payload.boxscore }
      }
    case "FETCH_BOXSCORE_ERROR":
      return {
        ...state
      }
    case "FETCH_RECAP_ARTICLE_SUCCESS":
      return {
        ...state,
        article: { ...payload }
      }
    case "CLOSE_ALL_MODALS":
      return { ...default_state }
    default:
      return state
  }
}
