import React from 'react'
import styled from 'styled-components'
import SearchResultItem from '../page_components/search_result_item'
import Spinner from '../assets/images/spinner.svg'

const Results = styled.ul`
  font-size: 2vw;
  display: flex;
  flex-direction: column;
  margin-left: 30%;
  padding: 3%;
`
const Loading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

class SearchResults extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      results: null,
    }
    this.search = this.search.bind(this)
    this.onSearchResponse = this.onSearchResponse.bind(this)
    this.onYouTubeApiLoad = this.onYouTubeApiLoad.bind(this)
    this.parseSearchResults = this.parseSearchResults.bind(this)
  }

  componentDidMount() {
    window.gapi.load('client', () => {
      window.gapi.client.load('youtube', 'v3', this.onYouTubeApiLoad)
    })
  }

  componentWillUpdate(nextProps) {
    const query = nextProps.match.params.username
    if (this.props.match.params.username !== query) {
      this.search(query)
    }
  }

  onYouTubeApiLoad() {
    window.gapi.client.setApiKey('AIzaSyCYNzEeEAbgeKH3nt7ZeHVMBn9Ej-gl4Ko')
    this.search()
  }

  onSearchResponse(response) {
    this.setState({
      results: response.items,
    })
  }

  search(query) {
    if (typeof query === 'undefined') {
      query = this.props.match.params.username
    }
    const request = window.gapi.client.youtube.search.list({
      part: 'snippet',
      type: 'channel',
      maxResults: 10,
      q: query,
    })
    request.execute(this.onSearchResponse)
  }

  parseSearchResults() {
    const results = this.state.results.map((result) => {
      const channelId = result.id.channelId
      return <SearchResultItem data={result} key={channelId} />
    })
    return results
  }

  render() {
    if (!this.state.results) {
      return <Loading><img src={Spinner} alt="loading-spinner" /></Loading>
    }
    if (!this.state.results.length) {
      return <h1>No results found</h1>
    }
    return (
      <Results>
        <h2>Channel Results</h2>
        {this.parseSearchResults()}
      </Results>
    )
  }
}

export default SearchResults
