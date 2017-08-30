import React from 'react'
import styled from 'styled-components'

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

class SliderCard extends React.Component {
  static addCommas(num) {
    return num.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  constructor(props) {
    super(props)
    this.state = {
      subs: null,
      views: null,
    }
    this.onSearchResponse = this.onSearchResponse.bind(this)
  }

  componentWillMount() {
    const request = window.gapi.client.youtube.channels.list({
      id: this.props.data.id.channelId,
      part: 'statistics',
    })
    request.execute(this.onSearchResponse)
  }

  onSearchResponse(response) {
    console.log(response)
    const subCount = SliderCard.addCommas(response.items[0].statistics.subscriberCount)
    const viewCount = SliderCard.addCommas(response.items[0].statistics.viewCount)
    this.setState({
      subs: subCount,
      views: viewCount,
    })
  }

  render() {
    const image = this.props.data.snippet.thumbnails.medium.url
    let title = this.props.data.snippet.channelTitle
    title = title.length > 20 ? `${title.slice(0, 16)}...` : title
    return (
      <Card>
        <Image src={image} />
        <Title>{title}</Title>
        <Data>{this.state.subs} subscribers</Data>
        <Data>{this.state.views} views</Data>
        <Data>Cosplay</Data>
      </Card>
    )
  }
}

export default SliderCard
