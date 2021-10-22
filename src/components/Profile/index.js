import {Component} from 'react'
import Cookies from 'js-cookie'
import LoadingView from '../LoadingView'
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

  renderSuccessView = () => {
    const {personDetail} = this.state
    const {displayName, url} = personDetail
    return (
      <div className="profile-bg-container">
        <Header />
        <h1 className="name">{displayName}</h1>
        <img src={url} alt="profile-logo" />
      </div>
    )
  }

  renderFailureView = () => <h1>Failed Attempt</h1>

  renderLoadingView = () => <LoadingView />

  renderItem2 = externalUrls => ({
    spotify: externalUrls.spotify,
  })

  renderItem3 = followers => ({
    href: followers.href,
    total: followers.total,
  })

  renderItem4 = images => ({
    height: images.height,
    url: images.url,
    width: images.width,
  })

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
        email: data.email,
        external_urls: this.renderItem2(data.external_urls),
        followers: this.renderItem3(data.followers),
        href: data.href,
        id: data.id,
        // images: this.renderItem4(data.images),
        images: data.images.map(eachItem => this.renderItem4(eachItem)),
        type: data.type,
        uri: data.uri,
      }
      console.log(updatedData)
      // this.renderSuccessView()
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
