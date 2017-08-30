import React from 'react'
import styled from 'styled-components'
import SliderCard from './slider_card'

const Section = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const Div = styled.div`
  margin-right: 5%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  font-size: 2vw;
`

const Ul = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  list-style: none;
  flex-wrap: wrap;

  li {
    margin: 2%;
  }
`

class Slider extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      youtubeList: null,
    }
    this.children = props.children
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
    window.gapi.client.setApiKey('AIzaSyCR5In4DZaTP6IEZQ0r1JceuvluJRzQNLE')
    this.search()
  }

  onSearchResponse(response) {
    this.setState({ youtubeList: response.items })
    console.log(response.items)
  }

  search() {
    const request = window.gapi.client.youtube.search.list({
      part: 'snippet',
      type: 'channel',
      maxResults: 6,
      q: 'tech',
    })
    request.execute(this.onSearchResponse)
  }

  render() {
    if (!this.state.youtubeList) return null
    const featuredList = this.state.youtubeList.map((item) => {
      return <li key={item.id.channelId}><SliderCard data={item} /></li>
    })
    return (
      <Section>
        <Div>{this.children}</Div>
        <Ul>
          {featuredList}
        </Ul>
      </Section>
    )
  }
}

export default Slider
