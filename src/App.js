import React, { useState } from 'react'
import 'antd/dist/antd.css'
import styled from 'styled-components'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import Sidebar from './sidebar/Sidebar'
import Header from './header/Header'
import Home from './Pages/Home'
import Search from './Pages/Search'
import Trace from './Pages/Trace'

const Container = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  grid-template-columns: auto 1fr;
  height: 100vh;
`

function App() {
  const [selectedNode, selectNode] = useState()

  return (
    <BrowserRouter>
      <Container>
        <Header />
        <Switch>
          <Route path='/trace/:traceId'>
            <Trace onSelectNode={selectNode} selectedNode={selectedNode} />
          </Route>
          <Route path='/search'>
            <Search />
          </Route>
          <Route path='/home'>
            <Home />
          </Route>
          <Redirect to='/home' />
        </Switch>
      </Container>
    </BrowserRouter>
  )
}

export default App
