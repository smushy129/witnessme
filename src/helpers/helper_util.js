function addCommas(num) {
  return num.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
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
