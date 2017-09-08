import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const SearchItem = styled.li`
  display: flex;
  margin-top: 3%;

  a {
    display: flex;
    flex-direction: row;
    align-items: center;
    text-decoration: none;
    color: black;
  }
`
const Title = styled.h2`
  font-size: 1.2vw;
`
const Thumbnail = styled.img`
  height: 4vw;
  width: 4vw;
`

class SearchResultItem extends React.Component {
  render() {
    const channelId = this.props.data.id.channelId
    const thumbnail = this.props.data.snippet.thumbnails.default.url
    const title = this.props.data.snippet.channelTitle
    return (
      <SearchItem>
        <Link to={`/youtube/${channelId}`}>
          <Thumbnail src={thumbnail} alt="thumbnail" />
          &nbsp; &nbsp;
          <Title>{title}</Title>
        </Link>
      </SearchItem>
    )
  }
}

export default SearchResultItem
