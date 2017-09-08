import React, { Component } from 'react'
import { Switch, Route, HashRouter } from 'react-router-dom'
import Header from './page_components/header'
import Landing from './view_components/landing'
import InfluencerShow from './view_components/influencer_show'
import BrowseYoutube from './view_components/browse_youtube'
import SearchResults from './view_components/search_results'

class App extends Component {
  render() {
    return (
      <HashRouter>
        <div style={{ height: '100%' }}>
          <Header />
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/youtube" component={BrowseYoutube} />
            <Route exact path="/youtube/:id" component={InfluencerShow} />
            <Route exacth path="/youtube/search/:username" component={SearchResults} />
          </Switch>
        </div>
      </HashRouter>
    )
  }
}

export default App
