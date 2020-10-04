import React from 'react'
import styled from 'styled-components'
import { Input } from 'antd';
import AutoComplete from '../widgets/AutoComplete';

const SERVICES = [
  {
    id: 1,
    name: 'apolo'
  },
  {
    id: 2,
    name: 'appa'
  },
  {
    id: 3,
    name: 'beco-diagonal'
  },
  {
    id: 4,
    name: 'c3po'
  }
]

const { Search } = Input;

const Container = styled.div`
  width: 200px;
  padding: 0px 4px;
`

const Sidebar = () => {
  const handleOnChange = (value) => {
    console.log('search value: ', value)
  }

  return (
    <Container>
      <AutoComplete
        placeholder="Select a service"
        options={SERVICES}
        onSelect={handleOnChange}
      />
    </Container>
  )
} 

export default Sidebar;