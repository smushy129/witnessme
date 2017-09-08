import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import BrowseButton from '../basic_components/browse_button'

const Body = styled.section`
  margin-bottom: 3%;
  width: 100%;
  height: 36vw;
  min-height: 500px;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(141deg, #0fb8ad 0%, #1fc8db 51%, #2cb5e8 75%);

  a {
    margin-top: 5%;
    text-decoration: none;
  }
`

const Title = styled.div`
  text-align: center;
  font-size 70px;
  font-size: 6vw;
  font-family: sans-serif;
`

const SplashImage = () => {
  return (
    <Body>
      <Title>
        <p>Find passionate influencers</p>
        <p>for your target audience.</p>
      </Title>
      <Link to="/youtube"><BrowseButton>Browse</BrowseButton></Link>
    </Body>
  )
}

export default SplashImage
