import React from 'react'
import styled from 'styled-components'
import YTListItem from './yt_list_item'

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

const categories = ['tech', 'art', 'gamer', 'guitar', 'make up', 'food']

class YTList extends React.Component {
  static shuffle(array) {
    let counter = array.length

    while (counter > 0) {
      const index = Math.floor(Math.random() * counter)
      counter -= 1
      const temp = array[counter]
      array[counter] = array[index]
      array[index] = temp
    }

    return array
  }

  constructor(props) {
    super(props)

    this.state = {
      youtubeList: [],
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
    window.gapi.client.setApiKey('AIzaSyCYNzEeEAbgeKH3nt7ZeHVMBn9Ej-gl4Ko')
    this.search()
  }

  onSearchResponse(response) {
    const shuffled = YTList.shuffle(response.items).slice(0, 2)
    const newState = [].concat(this.state.youtubeList).concat(shuffled)
    this.setState({ youtubeList: newState })
  }

  search() {
    let i = 0
    while (i < 6) {
      const category = categories[i]
      const request = window.gapi.client.youtube.search.list({
        part: 'snippet',
        type: 'channel',
        maxResults: 10,
        q: category,
      })
      request.execute(this.onSearchResponse)
      i += 2
    }
  }

  render() {
    if (!this.state.youtubeList.length) return null
    const featuredList = this.state.youtubeList.map((item) => {
      return <li key={item.id.channelId}><YTListItem data={item} /></li>
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

export default YTList
