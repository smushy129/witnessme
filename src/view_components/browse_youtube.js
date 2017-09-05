import React from 'react'
import styled from 'styled-components'
// import YouTubeCategory from '../page_components/youtube_category'
import Carousel from '../basic_components/carousel'

const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;

  h2 {
    font-size: 4vw;
  }
`
const categoryIds = {
  fashion: '/m/032tl',
  fitness: '/m/027x7n',
  food: '/m/02wbm',
  gaming: '/m/0bzvm2',
  pets: '/m/068hy',
  travel: '/m/07bxq',
  tech: '/m/07c1v',
  vehicles: '/m/07yv9',
}

class BrowseYoutube extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      fashion: null,
      fitness: null,
      food: null,
      gaming: null,
      pets: null,
      travel: null,
      tech: null,
      vehicles: null,
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

  onSearchResponse(response, category) {
    this.setState({
      [category]: response.items,
    })
  }

  search() {
    for (let category in categoryIds) {
      if (categoryIds.hasOwnProperty(category)) {
        const request = window.gapi.client.youtube.search.list({
          part: 'snippet',
          maxResults: 30,
          type: 'channel',
          topicId: categoryIds[category],
          order: 'viewCount',
        })
        request.execute((response) => this.onSearchResponse(response, category))
      }
    }
  }

  renderCategory(category) {
    const list = this.state[category]
    return <Carousel list={list} />
  }


  render() {
    const { fashion, fitness, food, gaming, pets, travel, tech, vehicles } = this.state
    if (!fashion || !fitness || !food ||
        !gaming || !pets || !travel || !tech || !vehicles) {
      return null
    }
    return (
      <Section>
        <h2>YouTube Categories</h2>
        {this.renderCategory('fashion')}
        {this.renderCategory('fitness')}
        {this.renderCategory('food')}
        {this.renderCategory('gaming')}
        {this.renderCategory('pets')}
        {this.renderCategory('travel')}
        {this.renderCategory('tech')}
        {this.renderCategory('vehicles')}
      </Section>
    )
  }
}

export default BrowseYoutube
