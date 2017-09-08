import React from 'react'
import styled from 'styled-components'
import scrollTo from '../helpers/scrollAnimation'
import YoutubeCategory from '../page_components/youtube_category'

const Section = styled.section`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: auto;
  width: 90vw;
`
const CategoryUl = styled.ul`
  white-space: nowrap;
  overflow: hidden;
  width: 84vw;

  li {
    display: inline-block;
    margin-top: 1vw;
    margin-right: 1vw;
    margin-bottom: 1vw;
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
    if (this.pos <= this.width * 6) {
      this.pos += this.width
      scrollTo(this.carouselComponent, this.pos, 300)
    }
  }

  renderSlides() {
    const { list } = this.props
    const categoryList = list.map((categoryItem) => {
      const channelId = categoryItem.id.channelId
      return <YoutubeCategory categoryData={categoryItem} key={channelId} />
    })
    return categoryList
  }

  render() {
    return (
      <Section>
        <Button onClick={this.handleLeft}>{'<'}</Button>
        <CategoryUl id="categoryUl" innerRef={(c) => { this.carouselViewPort = c }}>
          {this.renderSlides()}
        </CategoryUl>
        <Button onClick={this.handleRight}>{'>'}</Button>
      </Section>
    )
  }
}

export default Carousel
