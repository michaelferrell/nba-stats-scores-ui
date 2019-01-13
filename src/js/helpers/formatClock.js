export const formatClock = clock => {
  let result = clock
  if (clock === "0.0") {
    result = "End of Period"
  }
  // convert 33.0 seconds to 00:33
  if (clock.indexOf(":") === -1 && clock.indexOf(".") > -1) {
    result = "00:" + clock.split(".")[0]
  }
  // convert 1:09 to 01:09
  if (clock.indexOf(":") > -1 && clock.split(":")[0].length === 1) {
    result = "0" + clock.split(":")[0] + ":" + clock.split(":")[1]
  }
  return result
}
