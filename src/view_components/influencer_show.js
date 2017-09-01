import React from 'react'
import styled from 'styled-components'

const Profile = styled.section`
  margin: auto;
  width: 100%;
  height: 100%;
  padding-top: 3%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background: #fafafa;
`
const Title = styled.h1`
  font-size: 6vw;
`
const Image = styled.img`
  width: 30vw;
  height: 30vw;
  object-fit: cover;
  margin: 0 3%;
`
const ImageStats = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
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
  margin: auto 0;
  line-height: 2vw;
  font-size: 1.5vw;
  width: 40%;
  max-height: 30vw;
  text-align: left;
  overflow-y: scroll;

  ::-webkit-scrollbar {
    display: none;
  }

  h2 {
    font-size: 2vw;
    color: #767676;
    line-height: 3vw;
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

  constructor(props) {
    super(props)
    this.state = {
      title: null,
      description: null,
      subs: null,
      views: null,
      recentVideos: null,
      videoCount: null,
      image: null,
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
    this.setState({
      title: title,
      description: description,
      subs: InfluencerShow.getSubCount(response),
      views: InfluencerShow.getViewCount(response),
      videoCount: InfluencerShow.getVideoCount(response),
      recentVideos: null,
      image: image,
    })
  }

  search() {
    const channelId = this.props.match.params.id
    const request = window.gapi.client.youtube.channels.list({
      id: channelId,
      part: 'snippet,statistics',
    })
    request.execute(this.onSearchResponse)
  }

  render() {
    if (!this.state.subs) return null
    return (
      <Profile>
        <Title>{this.state.title}</Title>
        <ImageStats>
          <Description>
            <h2>Description</h2>
            {this.state.description}
          </Description>
          <Image src={this.state.image} />
          <Stats>
            <h2>Videos</h2>
            <p>{this.state.videoCount}</p>
            <h2>Views</h2>
            <p>{this.state.views}</p>
            <h2>Subscribers</h2>
            <p>{this.state.subs}</p>
          </Stats>
        </ImageStats>
      </Profile>
    )
  }
}

export default InfluencerShow
