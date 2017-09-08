import styled from 'styled-components'

const Input = styled.input`
  placeholder: Search;
  text-align: center;
  outline: none;

  &:focus {
    text-align: left;
    border: 2px solid #1DA1F2;
  },
`

export default Input
