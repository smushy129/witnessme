import React, { Component } from 'react'
import { Switch, Route, HashRouter } from 'react-router-dom'
import Header from './page_components/header'
import Landing from './view_components/landing'

class App extends Component {
  render() {
    return (
      <HashRouter>
        <div>
          <Header />
          <Switch>
            <Route exact path="/" component={Landing} />
          </Switch>
        </div>
      </HashRouter>
    )
  }
}

export default App
