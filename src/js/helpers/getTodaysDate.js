const getMockDate = () => {
  const days = 4
  let mock = new Date()
  let date = mock.setTime(mock.getTime() + (days * 24 * 60 * 60 * 1000))
  return new Date(date)
}

export const getTodaysDate = () => {
  // return getMockDate()
  return new Date()
}
