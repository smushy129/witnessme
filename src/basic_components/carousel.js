import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import scrollTo from '../helpers/scrollAnimation'

const Section = styled.section`
  display: flex;
  align-items: center;
  margin: auto;
  width: 90%;
`
const Title = styled.h3`
  font-size: 1.3vw;
`
const Image = styled.img`
  width: 17.9vw;
  height: 17.9vw;
  object-fit: cover;
`
const CategoryUl = styled.ul`
  white-space: nowrap;
  overflow: hidden;

  li {
    display: inline-block;
    margin: 2%;
  }
`
const Button = styled.button`
  height: 32px;
  border-radius: 50%;
  padding: 0 10px;
  background: white;
  border: none;
  font-size: 20px;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.3), 0 0 4px rgba(0, 0, 0, 0.2);
  cursor: pointer;

  &:focus {
    outline: none;
  }
`

class Carousel extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      state: null,
    }
    this.carouselComponent = null
    this.pos = 0
    this.renderSlides = this.renderSlides.bind(this)
    this.handleLeft = this.handleLeft.bind(this)
    this.handleRight = this.handleRight.bind(this)
  }

  componentDidMount() {
    this.carouselComponent = this.carouselViewPort
    this.width = document.getElementById('categoryUl').offsetWidth
  }

  handleLeft() {
    if (this.pos > 0) {
      this.pos -= this.width
      scrollTo(this.carouselComponent, this.pos, 300)
    }
  }

  handleRight() {
    this.pos += this.width
    scrollTo(this.carouselComponent, this.pos, 300)
  }

  renderSlides() {
    const { list } = this.props
    const categoryList = list.map((categoryItem) => {
      const image = categoryItem.snippet.thumbnails.medium.url
      const channelId = categoryItem.id.channelId
      let title = categoryItem.snippet.channelTitle
      title = title.length > 20 ? `${title.slice(0, 16)}...` : title
      return (
        <li key={channelId}>
          <Link to={`/youtube/${channelId}`}><Image src={image} /></Link>
          <Title>{title}</Title>
        </li>
      )
    })
    return categoryList
  }

  render() {
    return (
      <Section>
        <Button onClick={this.handleLeft}>{`<`}</Button>
        <CategoryUl id="categoryUl" innerRef={(c) => { this.carouselViewPort = c }}>
          {this.renderSlides()}
        </CategoryUl>
        &nbsp; &nbsp; &nbsp;
        <Button onClick={this.handleRight}>{`>`}</Button>
      </Section>
    )
  }
}

export default Carousel
