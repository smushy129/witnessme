import styled from 'styled-components'

const Button = styled.button`
  background-color: transparent;
  width: auto;
  border: none;
  object-fit: cover;
  outline: none;
  font-size: 16px;

  &:hover {
    opacity: 0.5;
    cursor: pointer;
  }

  &:active {
    position: relative;
    top: 2px;
  }
`
export default Button
