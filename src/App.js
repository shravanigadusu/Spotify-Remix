import {BrowserRouter, Route, Switch} from 'react-router-dom'
import SpotifyClone from './components/SpotifyClone'
import LoginForm from './components/LoginForm'
import Profile from './components/Profile'
import ProtectedRoute from './components/ProtectedRoute'
import YourMusic from './components/YourMusic'
import EachPlayListDetailView from './components/EachPlayListDetailView'

import './App.css'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/login" component={LoginForm} />
      <ProtectedRoute exact path="/" component={SpotifyClone} />
      <ProtectedRoute exact path="/profile" component={Profile} />
      <ProtectedRoute exact path="/yourMusic" component={YourMusic} />
      <ProtectedRoute
        exact
        path="/playlists/:id"
        component={EachPlayListDetailView}
      />
    </Switch>
  </BrowserRouter>
)

export default App
