import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import SplashImage from '../page_components/splash_image'
import YoutubeIcon from '../assets/images/youtube-icon.png'
import Slider from '../page_components/slider'

const Body = styled.div`
  margin: auto;
  width: 90%;
`

const SubHeader = styled.h2`
  font-size: 3rem;
  text-align: center;
`
const Icon = styled.img`
  width: 9vw;
  height: 8vw;
`

class Landing extends React.Component {
  render() {
    return (
      <div>
        <SplashImage />
        <Body>
          <SubHeader>Featured</SubHeader>
          <Slider>
            <Link to="youtube"><Icon src={YoutubeIcon} alt="youtube-icon" /></Link>
            <span>YouTube</span>
          </Slider>
        </Body>
      </div>
    )
  }
}

export default Landing

/*
<Link to="twitter"><img src={TwitterIcon} alt="twitter-icon" /></Link>
&nbsp;
<Link to="instagram"><img src={InstagramIcon} alt="instagram-icon" /></Link>
&nbsp;
<Link to="wechat"><img src={WechatIcon} alt="wechat-icon" /></Link>
</div>

import InstagramIcon from '../assets/images/instagram-icon.png'
import TwitterIcon from '../assets/images/twitter-icon.png'
import WechatIcon from '../assets/images/wechat-icon.png'
*/
