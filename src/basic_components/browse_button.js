import styled from 'styled-components'

const BrowseButton = styled.div`
  padding: 1.8vw 2.7vw;
  background-color: #ff0000;
  font-size: 2vw;
  color: white;
  border-radius: 16px;
  border: 0;
  outline: none;

  &:active {
    position: relative;
    top: 2px;
  }

  @media (max-width: 1200px) {
    padding: 20px 28px;
    font-size: 24px;
  }
`
export default BrowseButton
