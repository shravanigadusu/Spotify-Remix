import {BrowserRouter, Route, Switch} from 'react-router-dom'
import SpotifyClone from './components/SpotifyClone'
import LoginForm from './components/LoginForm'
import Profile from './components/Profile'
import ProtectedRoute from './components/ProtectedRoute'
import YourMusic from './components/YourMusic'
import EachPlayListDetailView from './components/EachPlayListDetailView'
import EachGenresDetailedView from './components/EachGenresDetailedView'
import EachReleasesDetailedView from './components/EachReleasesDetailedView'
import Playlists from './components/Playlists'
import NotFound from './components/NotFound'

import './App.css'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/login" component={LoginForm} />
      <ProtectedRoute exact path="/" component={SpotifyClone} />
      <ProtectedRoute exact path="/profile" component={Profile} />
      <ProtectedRoute exact path="/yourMusic" component={YourMusic} />
      <ProtectedRoute exact path="/playlists" component={Playlists} />
      <ProtectedRoute
        exact
        path="/playlists/:id"
        component={EachPlayListDetailView}
      />
      <ProtectedRoute
        path="/categories/:id/playlists"
        component={EachGenresDetailedView}
      />
      <ProtectedRoute
        exact
        path="/albums/:id"
        component={EachReleasesDetailedView}
      />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
)

export default App
