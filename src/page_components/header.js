import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Input from '../basic_components/input'
import Button from '../basic_components/button'
import Logo from '../basic_components/logo'

const Head = styled.header`
  margin: auto;
  width: 95%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  input {
    margin-right: 10%;
  }

  @media (max-width: 750px) {
    input {
      display: none;
    }
  }

  @media (max-width: 500px) {
    a {
      width: 200px
    }

    img {
      width: 75%;
      height: 75%;
    }
  }
`

class Header extends React.Component {
  render() {
    return (
      <Head>
        <Link to="/">{<Logo />}</Link>
        <Input placeholder="Search" />
        <div>
          <Button><span>Login</span></Button>
          &nbsp; &nbsp;
          <Button><span>Register</span></Button>
        </div>
      </Head>
    )
  }
}

export default Header
