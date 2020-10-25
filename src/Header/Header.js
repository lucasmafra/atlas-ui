import React from 'react'
import styled from 'styled-components'
import { Link, useHistory } from 'react-router-dom'
import InputSearch from '../widgets/InputSearch'

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  grid-column: 1 / -1;
  padding: 8px 16px;
  background-color: #1890ff;
`
const Title = styled.h1`
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
  font-size: 32px;
  color: white;
  margin: 0;
`

const Header = () => {
  const history = useHistory()

  const handleOnSearch = (traceId) => {
    history.push(`/trace/${traceId}`)
  }

  return (
    <Container>
      <Link to='/'>
        <Title>Atlas</Title>
      </Link>
      <InputSearch placeholder='Search for Trace ID' onSearch={handleOnSearch} />
    </Container>
  )
}

export default Header
