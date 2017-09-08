import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import * as HelperUtil from '../helpers/helper_util'

const Title = styled.h3`
  margin-top: 8px;
  font-size: 1.5vw;
`
const Image = styled.img`
  width: 20vw;
  height: 20vw;
  object-fit: cover;
`
const Stats = styled.p`
  font-size: 1.3vw;
  color: #767676;
`
const Li = styled.li`
  display: flex;
  flex-direction: column;
`

class YoutubeCategory extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      subscriberCount: null,
      viewCount: null,
    }
    this.onSearchResponse = this.onSearchResponse.bind(this)
  }

  componentDidMount() {
    const channelId = this.props.categoryData.id.channelId
    const request = window.gapi.client.youtube.channels.list({
      id: channelId,
      part: 'statistics',
    })
    request.execute(this.onSearchResponse)
  }

  onSearchResponse(response) {
    this.setState({
      subscriberCount: HelperUtil.getSubCount(response),
      viewCount: HelperUtil.getViewCount(response),
    })
  }

  render() {
    const image = this.props.categoryData.snippet.thumbnails.medium.url
    const channelId = this.props.categoryData.id.channelId
    let title = this.props.categoryData.snippet.channelTitle
    title = title.length > 20 ? `${title.slice(0, 16)}...` : title
    if (this.state.subscriberCount === null) return null
    return (
      <Li>
        <Link to={`/youtube/${channelId}`}><Image src={image} /></Link>
        <Title>{title}</Title>
        <Stats>{this.state.subscriberCount} subscribers</Stats>
        <Stats>{this.state.viewCount} views</Stats>
      </Li>
    )
  }
}

export default YoutubeCategory
