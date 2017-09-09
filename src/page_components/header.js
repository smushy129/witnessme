import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import styled from 'styled-components'
import Input from '../basic_components/input'
import Logo from '../basic_components/logo'

const Head = styled.header`
  margin: auto;
  width: 95%;
  display: flex;
  justify-content: space-around;
  align-items: center;

  input {
    background-color: #f5f8fa;
    border-radius: 21px;
    border: 1px solid #e6ecf0;
    box-sizing: border-box;
    color: #14171a;
    display: block;
    font-size: 12px;
    height: 32px;
    line-height: 16px;
    padding: 8px 32px 8px 12px;
  }

  @media (max-width: 750px) {
    a {
      width: 200px
    }

    img {
      width: 75%;
      height: 75%;
    }

    input {
      background-color: #f5f8fa;
      border-radius: 21px;
      border: 1px solid #e6ecf0;
      box-sizing: border-box;
      color: #14171a;
      display: block;
      font-size: 8px;
      height: 20px;
      line-height: 8px;
      padding: 8px 0;
    }
  }
`

class Header extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      username: '',
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    this.searchBarComponent = this.searchBar
  }

  handleChange(e) {
    this.setState({ username: e.currentTarget.value })
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.history.push(`/youtube/search/${this.state.username}`)
    this.setState({ username: '' })
    this.searchBarComponent.value = ''
    this.searchBarComponent.blur()
  }

  render() {
    return (
      <Head>
        <Link to="/">{<Logo />}</Link>
        <form onSubmit={this.handleSubmit}>
          <Input
            placeholder="Search"
            onChange={this.handleChange}
            innerRef={(c) => { this.searchBar = c }}
          />
        </form>
      </Head>
    )
  }
}

export default withRouter(Header)
