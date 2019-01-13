export const formatGameCode = dateObj => {
  let date = dateObj.date.toString()
  date = date.length === 1 ? "0" + date : date
  let month = (dateObj.month_index + 1).toString()
  month = month.length === 1 ? "0" + month : month
  return dateObj.year.toString() + month.toString() + date
}
