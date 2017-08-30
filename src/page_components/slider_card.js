import React from 'react'
import styled from 'styled-components'
import rinnie from '../assets/images/rinnieriot.jpg'

const Data = styled.span`
  line-height: 1.3em;
  font-size: 1.5vw;
  color: #767676;
`

const Name = styled.h3`
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
  render() {
    const image = this.props.data.snippet.thumbnails.medium.url
    console.log(this.props)
    return (
      <Card>
        <Image src={image} />
        <Name>RinnieRiot</Name>
        <Data>57,182 subscribers</Data>
        <Data>100,000,000 views</Data>
        <Data>Cosplay</Data>
      </Card>
    )
  }
}

export default SliderCard
