import React, { useEffect, useState } from 'react'
import { Spin } from 'antd'
import 'antd/dist/antd.css'
import styled from 'styled-components'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import SequenceDiagram from './sequence-diagram/SequenceDiagram'
import { objectKeysToCamel } from './common-js/misc'
import Sidebar from './sidebar/Sidebar'
import Header from './header/Header'
import Home from './Pages/Home'
import Search from './Pages/Search'

const Container = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  grid-template-columns: auto 1fr;
  height: 100vh;
`

function App() {
  const [loading, setLoading] = useState(true)
  const [sequenceDiagram, setSequenceDiagram] = useState(null)

  useEffect(() => {
    fetch('/mock_transaction_feed.json')
      .then((r) => r.json())
      .then((data) => {
        setSequenceDiagram(objectKeysToCamel(data).sequenceDiagram)
      })
      .catch((e) => {
        // TODO error handling
        console.log(e)
      })
      .finally(() => {
        setTimeout(() => setLoading(false), 1000)
      })
  }, [])

  return (
    <BrowserRouter>
      <Container>
        <Header />
        <Sidebar />
        <Switch>
          <Route path="/trace/:traceId">
            {loading ? <Spin aria-label='Loading' /> : <SequenceDiagram data={sequenceDiagram} />}
          </Route>
          <Route path="/search">
            <Search />
          </Route>
          <Route path="/home">
            <Home />
          </Route>
          <Redirect to='/home' />
        </Switch>
      </Container>
    </BrowserRouter>
  )
}

export default App
