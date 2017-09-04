import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

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

const YoutubeCategory = ({ categoryData }) => {
  const image = categoryData.snippet.thumbnails.medium.url
  const channelId = categoryData.id.channelId
  let title = categoryData.snippet.channelTitle
  title = title.length > 20 ? `${title.slice(0, 16)}...` : title
  return (
    <Card>
      <Link to={`/youtube/${channelId}`}><Image src={image} /></Link>
      <Title>{title}</Title>
    </Card>
  )
}

export default YoutubeCategory
