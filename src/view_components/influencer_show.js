import React from 'react'
import styled from 'styled-components'
import RecentVideosList from '../page_components/recent_videos_list'
import * as HelperUtil from '../helpers/helper_util'
import Spinner from '../assets/images/spinner.svg'

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
  background: #767676;
  height: 15vw;
  width: 90vw;
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
const Loading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

class InfluencerShow extends React.Component {
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
    const description = response.items[0].snippet.description === '' ? 'Nothing here :(' : response.items[0].snippet.description
    const title = response.items[0].snippet.title
    const banner = response.items[0].brandingSettings.image.bannerImageUrl
    this.setState({
      title: title,
      description: description,
      subs: HelperUtil.getSubCount(response),
      views: HelperUtil.getViewCount(response),
      videoCount: HelperUtil.getVideoCount(response),
      publishedDate: HelperUtil.parseDate(response),
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
    if (!this.state.subs) return <Loading><img src={Spinner} alt="loading-spinner" /></Loading>
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
