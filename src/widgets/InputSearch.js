import React from 'react'
import styled from 'styled-components'
import { Input } from 'antd'

const { Search } = Input

const StyledSearch = styled(Search)`
  width: 250px;
`

const InputSearch = ({ placeholder, onSearch }) => {
  return <StyledSearch placeholder={placeholder} onSearch={onSearch} />
}

export default InputSearch
