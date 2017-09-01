import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Data = styled.span`
  line-height: 1.3em;
  font-size: 1.5vw;
  color: #767676;
`

const Title = styled.h3`
  margin-top: 8px;
  font-size: 2vw;
`

const Image = styled.img`
  width: 20vw;
  height: 20vw;
  object-fit: cover;
`

const Card = styled.section`
  width: auto;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

class YTListItem extends React.Component {
  static addCommas(num) {
    return num.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  static getSubCount(response) {
    return YTListItem.addCommas(response.items[0].statistics.subscriberCount)
  }

  static getViewCount(response) {
    return YTListItem.addCommas(response.items[0].statistics.viewCount)
  }

  static parseKeywords(response) {
    let keywords = response.items[0].brandingSettings.channel.keywords
    if (keywords) {
      keywords = keywords.split(' ').slice(0, 2)
      keywords.forEach((word, idx) => {
        keywords[idx] = `#${keywords[idx]}`
      })
      keywords = keywords.join(' ')
      return keywords.replace(/["]/g, '')
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      subs: null,
      views: null,
      keywords: null,
    }
    this.onSearchResponse = this.onSearchResponse.bind(this)
  }

  componentWillMount() {
    const request = window.gapi.client.youtube.channels.list({
      id: this.props.data.id.channelId,
      part: 'statistics,brandingSettings',
    })
    request.execute(this.onSearchResponse)
  }

  onSearchResponse(response) {
    this.setState({
      subs: YTListItem.getSubCount(response),
      views: YTListItem.getViewCount(response),
      keywords: YTListItem.parseKeywords(response),
    })
  }

  render() {
    const image = this.props.data.snippet.thumbnails.medium.url
    const channelId = this.props.data.id.channelId
    let title = this.props.data.snippet.channelTitle
    title = title.length > 20 ? `${title.slice(0, 16)}...` : title
    return (
      <Card>
        <Link to={`/youtube/${channelId}`}><Image src={image} /></Link>
        <Title>{title}</Title>
        <Data>{this.state.subs} subscribers</Data>
        <Data>{this.state.views} views</Data>
        <Data>{this.state.keywords}</Data>
      </Card>
    )
  }
}

export default YTListItem
