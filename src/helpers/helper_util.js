function addCommas(num) {
  return num.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

function padZero(num) {
  const month = Number(num) + 1
  if (month < 10) {
    return `0${month}`
  }
  return `${month}`
}

export const getSubCount = (response) => {
  return addCommas(response.items[0].statistics.subscriberCount)
}

export const getViewCount = (response) => {
  return addCommas(response.items[0].statistics.viewCount)
}

export const getVideoCount = (response) => {
  return addCommas(response.items[0].statistics.videoCount)
}

export const parseDate = (response) => {
  const date = new Date(response.items[0].snippet.publishedAt)
  const year = padZero(date.getFullYear())
  const month = padZero(date.getMonth())
  const day = padZero(date.getDate())
  return `${month}/${day}/${year}`
}
