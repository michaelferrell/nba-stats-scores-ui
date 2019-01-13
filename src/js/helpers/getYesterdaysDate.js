export const getYesterdaysDate = date => {
  let dt = new Date(date)
  dt = new Date(dt.setDate(dt.getDate() - 1)).toString()
  return new Date(dt)
}
