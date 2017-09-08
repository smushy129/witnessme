import React from 'react'
import styled from 'styled-components'

const Section = styled.section`
  display: flex;
  justify-content: center;
  font-size: 1vw;
  margin: 2%;

  a {
    text-decoration: none;
    font-weight: bold;
    color: #002776;
    margin: 2%;
  }
`

const Footer = () => {
  return (
    <Section>
      <a target="_blank" rel="noopener noreferrer" href="http://www.kingsleyliao.com" alt="portfolio">PORTFOLIO</a>
      <a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/kingsleyliao" alt="linkedin">LINKEDIN</a>
      <a target="_blank" rel="noopener noreferrer" href="https://www.github.com/kingsleyliao" alt="github">GITHUB</a>
    </Section>
  )
}

export default Footer
