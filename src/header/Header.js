import React from 'react'
import styled from 'styled-components'
import { Typography } from 'antd';

const { Title } = Typography;

const Container = styled.div`
  grid-column: 1 / -1;
`

const Header = () => {
  return (
    <Container>
      <Title>Atlas</Title>
    </Container>
  )
} 

export default Header;