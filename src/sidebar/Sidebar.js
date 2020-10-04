import React, { useState } from 'react'
import styled from 'styled-components'
import { Input, Button, Tooltip } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
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

const OPERATIONS = [
  {
    id: 1,
    name: 'GET HTTP'
  },
  {
    id: 2,
    name: 'POST HTTP'
  },
  {
    id: 3,
    name: 'graphql mutation'
  },
  {
    id: 4,
    name: 'consume'
  },
  {
    id: 5,
    name: 'produce'
  }
]

const { Search } = Input;

const StyledButton = styled(Button)`
  justify-self: start;
`

const Container = styled.div`
  display: grid;
  grid-auto-flow: row;
  gap: 16px;
  align-content: start;
  width: 300px;
  padding: 0px 16px;
`

const Sidebar = () => {
  const [form, setForm] = useState({ service: undefined, operation: undefined })

  const handleOnChangeService = (service) => {
    console.log('search value: ', service)
    setForm({ ...form, service })
  }

  const handleOnChangeOperation = (operation) => {
    console.log('search value: ', operation)
    setForm({ ...form, operation })
  }

  const handleOnClick = () => {
    console.log(form)
  }

  return (
    <Container>
      <AutoComplete
        placeholder="Select a service"
        options={SERVICES}
        onSelect={handleOnChangeService}
        label="Service"
      />
      <AutoComplete
        placeholder="Select an opeation"
        options={OPERATIONS}
        onSelect={handleOnChangeOperation}
        label="Operation"
      />
      <StyledButton
        type="primary"
        icon={<SearchOutlined />}
        onClick={handleOnClick}
      >
        Search
      </StyledButton>
    </Container>
  )
} 

export default Sidebar;