import React from 'react'
import styled from 'styled-components'
import RecentVideoItem from './recent_video_item'

const Section = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 90%;
  background: #FFF;
  padding: 1%;

  h2 {
    font-size: 2vw;
    color: #767676;
    line-height: 3vw;
  }
`
const VideoList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  max-width: 90%;

  li {
    margin-right: 2%;
    margin-top: 2%;

    iframe {
      width: 25vw;
      height: 14vw;
      frame-border: 0;
    }
  }
`

class RecentVideosList extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      videoList: null,
    }
    this.onSearchResponse = this.onSearchResponse.bind(this)
    this.parseVideos = this.parseVideos.bind(this)
  }

  componentDidMount() {
    const channelId = this.props.channelId
    const request = window.gapi.client.youtube.search.list({
      channelId: channelId,
      part: 'snippet',
      order: 'date',
      maxResults: 6,
      type: 'video',
    })
    request.execute(this.onSearchResponse)
  }

  onSearchResponse(response) {
    const videos = response.items
    this.setState({
      videoList: videos,
    })
  }

  parseVideos() {
    const videos = this.state.videoList.map((video) => {
      return <li key={video.id.videoId}><RecentVideoItem id={video.id.videoId} /></li>
    })
    return videos
  }

  render() {
    if (!this.state.videoList) return null
    return (
      <Section>
        <h2>Recent Videos</h2>
        <VideoList>
          {this.parseVideos()}
        </VideoList>
      </Section>
    )
  }
}

export default RecentVideosList
