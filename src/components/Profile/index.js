import {Component} from 'react'
import Cookies from 'js-cookie'
import LoadingView from '../LoadingView'
import FailedView from '../FailedView'
import Header from '../Header'

import './index.css'

const apiStatusConstants = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'PROGRESS',
  initial: 'INITIAL',
}
class Profile extends Component {
  state = {personDetail: {}, apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getProfileDetails()
  }

  onLogoutPage = () => {
    const {history} = this.props
    Cookies.remove('pa_token')
    history.replace('/login')
  }

  renderSuccessView = () => {
    const {personDetail} = this.state
    const {displayName, imageUrl, followers} = personDetail
    return (
      <>
        <Header />
        <div className="profile-bg-container">
          <img src={imageUrl} alt="profile-logo" className="profile-image" />
          <h1 className="name">{displayName}</h1>
          <div className="count-container">
            <div className="Followers-container">
              <p className="green-styling">{followers}</p>
              <p className="text-style">FOLLOWERS</p>
            </div>
            <div className="Followers-container">
              <p className="green-styling">1</p>
              <p className="text-style">PLAYLISTS</p>
            </div>
          </div>
          <button type="button" className="button" onClick={this.onLogoutPage}>
            LOGOUT
          </button>
        </div>
      </>
    )
  }

  renderFailureView = () => <FailedView />

  renderLoadingView = () => <LoadingView />

  getProfileDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const token = Cookies.get('pa_token')
    const profileUrl = 'https://api.spotify.com/v1/me'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(profileUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const updatedData = {
        country: data.country,
        displayName: data.display_name,
        followers: data.followers.total,
        id: data.id,
        imageUrl: data.images[0].url,
      }
      console.log(updatedData)
      this.setState({
        personDetail: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  render() {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }
}

export default Profile
