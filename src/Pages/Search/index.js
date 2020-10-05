import React from 'react'
import styled from 'styled-components'
import useQueryParams from '../../hooks/useQueryParams'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 32px;
  width: 500px;
  margin: 0 auto;
`

const StyledHeader = styled.h1`
  font-size: 28px;
  margin: 0;
  color: #262626;
`

const Text = styled.p`
  margin-bottom: 8px;
  color: #262626;
  font-size: 20px;
  align-self: flex-start;
`

const Search = () => {
  const queryParams = useQueryParams()
  const objQueryParams = {}

  for (const [key, value] of queryParams) {
    console.log('key = ', key)
    console.log('value = ', value)
    objQueryParams[key] = value
  }

  console.log(objQueryParams)

  return (
    <Container>
      <StyledHeader>
        Aqui mostraremos os resultados da busca para os seguintes parâmetros
      </StyledHeader>
      {Object.entries(objQueryParams).map(([key, value]) => {
        return <Text key={key}>{key}: {value}</Text>
      })}
    </Container>
  )
}

export default Search