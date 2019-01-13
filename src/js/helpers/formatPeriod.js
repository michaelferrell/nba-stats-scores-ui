export const formatPeriod = period => {
  let result = "Q" + period
  if (period === 0) {
    result = "Pre-game"
  } else if (period === 5) {
    result = "OT"
  } else if (period === 6) {
    result = "OT2"
  } else if (period === 7) {
    result = "OT3"
  }
  return result
}
