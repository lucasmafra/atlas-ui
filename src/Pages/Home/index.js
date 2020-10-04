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
  margin: 0;
  text-align: center;
  color: #262626;
  width: 300px;
`

const Home = () => {
  return (
    <Container>
      <StyledHeader>
        Busque o trace por ID ou por parâmetros
      </StyledHeader>
    </Container>
  )
}

export default Home