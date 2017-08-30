import styled from 'styled-components'

const BrowseButton = styled.button`
  margin-top: 5%;
  padding: 24px 32px;
  background-color: #ff0000;
  font-size: 32px;
  color: white;
  border-radius: 16px;
  border: 0;
  outline: none;

  &:active {
    position: relative;
    top: 2px;
  }

  @media (max-width: 1200px) {
    padding: 16px 24px;
    font-size: 24px;
  }
`
export default BrowseButton
