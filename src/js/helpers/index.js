export const roundTo = (number, precision) => {
  if (precision === undefined) {
    precision = 0
  }
  precision = Math.pow(10, precision - 1)
  return Math.round(number * 10 * precision) / (10 * precision)
}

export const round = n => Math.round(n * 100) / 100

export const calculateLoanProgress = loan => {
  let originalAmount = displayToNumber(loan.details.original_amount.value)
  let balance = displayToNumber(loan.balance)
  return round(100 - balance / originalAmount * 100)
}

export const displayToNumber = d => {
  if (typeof d === "string" && d.indexOf("$") > -1) {
    return d.replace("$", "").replace(",", "")
  }
  return d
}

export const strToInterestRate = str => {
  if (str.indexOf("%") > -1) {
    return str.split("%")[0]
  }
  return str
}

export const calculateBalance = loans =>
  loans.reduce((acc, v) => acc + parseFloat(displayToNumber(v.balance)), 0)

export const calculateTotalBalance = account =>
  Object.keys(account).reduce(
    (total, k) => total + calculateBalance(account[k].loans),
    0
  )

export const calculateOriginalAmount = loans =>
  loans.reduce(
    (acc, v) =>
      acc + parseFloat(displayToNumber(v.details.original_amount.value)),
    0
  )

export const calculateTotalOriginalAmount = account =>
  Object.keys(account).reduce(
    (total, v) => total + calculateOriginalAmount(account[v].loans),
    0
  )

export const calculateDailyInterestRate = interestRate => interestRate / 365

export const calculateAccruedMonthlyInterest = loans =>
  loans.reduce(
    (acc, loan) => acc + getDaysInMonth() * calculateAccruedDailyInterest(loan),
    0
  )

export const calculateTotalAccruedMonthlyInterest = account =>
  getDaysInMonth() * calculateTotalAccruedDailyInterest(account)

export const calculateAccruedDailyInterest = loan => {
  let interestRate = parseFloat(strToInterestRate(loan.interestRate))
  const dailyInterestRate = calculateDailyInterestRate(interestRate / 100)
  const balance = displayToNumber(loan.balance)
  const accruedDailyInterest = balance * dailyInterestRate
  return accruedDailyInterest
}

export const calculateTotalAccruedDailyInterest = account =>
  Object.keys(account).reduce(
    (total, v) =>
      total +
      account[v].loans.reduce(
        (acc, loan) => acc + calculateAccruedDailyInterest(loan),
        0
      ),
    0
  )

export const calculateTotalSpendings = account =>
  calculateTotalOriginalAmount(account) - calculateTotalBalance(account)

export const calculateLoanSpendings = loan =>
  parseFloat(displayToNumber(loan.details.original_amount.value)) -
  parseFloat(displayToNumber(loan.balance))

export const getDaysInMonth = () => {
  return 30
}

export const calculateAverageInterestRate = account => {
  let ratesList = Object.keys(account)
    .map(key =>
      account[key].loans.map(loan => strToInterestRate(loan.interestRate))
    )
    .reduceRight((acc, v) => acc.concat(v), [])
  let sum = ratesList.reduce((acc, v) => acc + parseFloat(v), 0)
  const average = sum / ratesList.length
  return average
}
