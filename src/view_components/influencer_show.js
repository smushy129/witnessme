import React from 'react'
import styled from 'styled-components'
import RecentVideosList from '../page_components/recent_videos_list'

const Profile = styled.section`
  margin: auto;
  width: 100%;
  height: 100%;
  padding-top: 3%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fafafa;
`
const Banner = styled.img`
  object-fit: cover;
`
const Avatar = styled.img`
  width: 30vw;
  height: 30vw;
  object-fit: cover;
  margin-right: 3%;
`
const ImageStats = styled.div`
  display: flex;
  justify-content: center;
  width: 90%;
  font-size: 2vw;
  background: #FFF;
  margin: 3%;
`
const Stats = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: left;

  h2 {
    color: #767676;
    line-height: 3vw;
  }

  p {
    margin-bottom: 16px;
  }
`
const Description = styled.span`
  display: flex;
  flex-direction: column;
  align-items: center;
  line-height: 2vw;
  font-size: 1.5vw;
  width: 90%;
  background: #FFF;
  margin-bottom: 3%;
  padding: 1%;
  text-align: justify;

  h2 {
    font-size: 2vw;
    color: #767676;
    line-height: 3vw;
    text-align: center;
  }
`

class InfluencerShow extends React.Component {
  static addCommas(num) {
    return num.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  static getSubCount(response) {
    return InfluencerShow.addCommas(response.items[0].statistics.subscriberCount)
  }

  static getViewCount(response) {
    return InfluencerShow.addCommas(response.items[0].statistics.viewCount)
  }

  static getVideoCount(response) {
    return InfluencerShow.addCommas(response.items[0].statistics.videoCount)
  }

  static padZero(num) {
    const month = Number(num) + 1
    if (month < 10) {
      return `0${month}`
    }
    return `${month}`
  }

  static parseDate(response) {
    const date = new Date(response.items[0].snippet.publishedAt)
    const year = InfluencerShow.padZero(date.getFullYear())
    const month = InfluencerShow.padZero(date.getMonth())
    const day = InfluencerShow.padZero(date.getDate())
    return `${month}/${day}/${year}`
  }

  constructor(props) {
    super(props)
    this.state = {
      title: null,
      description: null,
      subs: null,
      views: null,
      publishedDate: null,
      recentVideos: null,
      videoCount: null,
      image: null,
      banner: null,
    }
    this.onYouTubeApiLoad = this.onYouTubeApiLoad.bind(this)
    this.onSearchResponse = this.onSearchResponse.bind(this)
    this.search = this.search.bind(this)
  }

  componentDidMount() {
    window.gapi.load('client', () => {
      window.gapi.client.load('youtube', 'v3', this.onYouTubeApiLoad)
    })
  }

  onYouTubeApiLoad() {
    window.gapi.client.setApiKey('AIzaSyCYNzEeEAbgeKH3nt7ZeHVMBn9Ej-gl4Ko')
    this.search()
  }

  onSearchResponse(response) {
    const image = response.items[0].snippet.thumbnails.high.url
    const description = response.items[0].snippet.description
    const title = response.items[0].snippet.title
    const banner = response.items[0].brandingSettings.image.bannerImageUrl
    this.setState({
      title: title,
      description: description,
      subs: InfluencerShow.getSubCount(response),
      views: InfluencerShow.getViewCount(response),
      videoCount: InfluencerShow.getVideoCount(response),
      publishedDate: InfluencerShow.parseDate(response),
      recentVideos: null,
      banner: banner,
      image: image,
    })
  }

  search() {
    const channelId = this.props.match.params.id
    const request = window.gapi.client.youtube.channels.list({
      id: channelId,
      part: 'snippet,statistics,brandingSettings',
    })
    request.execute(this.onSearchResponse)
  }

  render() {
    if (!this.state.subs) return null
    const channelId = this.props.match.params.id
    return (
      <Profile>
        <Banner src={this.state.banner} />
        <ImageStats>
          <Avatar src={this.state.image} />
          <Stats>
            <h2>Channel Title</h2>
            <p>{this.state.title}</p>
            <h2>Videos</h2>
            <p>{this.state.videoCount}</p>
            <h2>Views</h2>
            <p>{this.state.views}</p>
            <h2>Subscribers</h2>
            <p>{this.state.subs}</p>
            <h2>Joined</h2>
            <p>{this.state.publishedDate}</p>
          </Stats>
        </ImageStats>
        <Description>
          <h2>About</h2>
          {this.state.description}
        </Description>
        <RecentVideosList channelId={channelId} />
      </Profile>
    )
  }
}

export default InfluencerShow
