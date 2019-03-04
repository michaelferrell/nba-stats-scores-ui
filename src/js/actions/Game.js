import { BOXSCORE_URL, RECAP_ARTICLE_URL } from "./../constants/"

import { getRecapParams } from "./../helpers/getRecapParams"

const fetchBoxscoreSuccess = payload => ({
  type: "FETCH_BOXSCORE_SUCCESS",
  payload
})

const fetchBoxscoreError = payload => ({
  type: "FETCH_BOXSCORE_ERROR",
  payload
})

export const fetchBoxscore = game => dispatch => {
  let url = BOXSCORE_URL + "?gdate=" + game.game_code + "&gid=" + game.game_id
  return fetch(url)
    .then(response => response.json())
    .catch(function(err) {
      fetchBoxscoreError(err)
    })
    .then(data => {
      if (data) {
        let boxscore = data.stats
        dispatch(fetchBoxscoreSuccess({ boxscore, game }))
      } else {
        dispatch(fetchBoxscoreError(data))
      }
    })
}

const fetchRecapArticleSuccess = payload => ({
  type: "FETCH_RECAP_ARTICLE_SUCCESS",
  payload
})

const fetchRecapArticleError = payload => ({
  type: "FETCH_RECAP_ARTICLE_ERROR",
  payload
})

export const fetchRecapArticle = game => dispatch => {
  fetch(RECAP_ARTICLE_URL + getRecapParams(game))
    .then(response => response.json())
    .catch(err => false)
    .then(data => {
      if (data && data.title && data.author && data.paragraphs) {
        let article = {
          title: data.title,
          author: data.author,
          paragraphs: data.paragraphs
        }
        dispatch(fetchRecapArticleSuccess(article))
      } else {
        dispatch(fetchRecapArticleError(data))
      }
    })
}
