function scrollTo(element, to, duration) {
  let start = element.scrollLeft
  let change = to - start
  let increment = 20

  let animateScroll = (elapsedTime) => {
    elapsedTime += increment
    let position = easeInOut(elapsedTime, start, change, duration)
    element.scrollLeft = position
    if (elapsedTime < duration) {
      setTimeout(() => {
        animateScroll(elapsedTime)
      }, increment)
    }
  }
  animateScroll(0)
}

function easeInOut(currentTime, start, change, duration) {
  currentTime /= duration / 2
  if (currentTime < 1) {
    return change / 2 * currentTime * currentTime + start
  }
  currentTime -= 1
  return -change / 2 * (currentTime * (currentTime - 2) - 1) + start
}

export default scrollTo
