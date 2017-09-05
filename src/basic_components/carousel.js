import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Title = styled.h3`
  font-size: 2vw;
`
const Image = styled.img`
  width: 20vw;
  height: 20vw;
  object-fit: cover;
`
const CategoryUl = styled.ul`
  display: flex;
  flex-direction: row;
  align-items: center;

  li {
    margin: 3%;
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
    this.renderSlides = this.renderSlides.bind(this)
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
      <CategoryUl>
        <Button>{`<`}</Button>
        {this.renderSlides()}
        <Button>{`>`}</Button>
      </CategoryUl>
    )
  }
}

export default Carousel
