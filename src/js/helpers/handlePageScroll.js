export const handlePageScroll = location => {
  if (!location) {
    return
  } else if (location === "top") {
    // scroll to top and remove hash state
    window.scrollTo(0, 0)
    const noHashURL = window.location.href.replace(/#.*$/, "")
    window.history.replaceState("", document.title, noHashURL)
  } else {
    // scroll to page id (gameCode)
    const id = document.getElementById(location)
    if (id) {
      id.scrollIntoView()
    } else {
      console.log("cant scroll into view")
    }
  }
}
