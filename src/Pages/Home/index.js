import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-self: start;
  padding-top: 32px;
`

const StyledHeader = styled.h1`
  font-size: 28px;
  margin-top: 240px;
  text-align: center;
  color: #262626;
  width: 100vw;
`

const Home = () => {
  return (
    <Container>
      <StyledHeader>Busque o trace por ID</StyledHeader>
    </Container>
  )
}

export default Home
