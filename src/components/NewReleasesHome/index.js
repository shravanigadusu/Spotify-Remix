import {Component} from 'react'
import Cookies from 'js-cookie'
import LoadingView from '../LoadingView'
import FailedView from '../FailedView'
import NewReleasesCard from '../NewReleasesCard'
import './index.css'

const apiStatusConstants = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'PROGRESS',
  initial: 'INITIAL',
}

class NewReleasesHome extends Component {
  state = {
    newReleasesList: {},
    apiStatus: apiStatusConstants.initial,
    getUserCountry: '',
  }

  componentDidMount() {
    this.getCountryValue()
    // this.getNewReleasesData()
  }

  renderSuccessView = () => {
    const {newReleasesList} = this.state
    return (
      <div className="list-container-new-release">
        <h1 className="new-release-heading">New Releases</h1>
        <ul className="new-release-ul-list">
          {newReleasesList.map(eachItem => (
            <NewReleasesCard eachDetail={eachItem} key={eachItem.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderFailureView = () => <FailedView />

  renderLoadingView = () => <LoadingView />

  getCountryValue = async () => {
    const token = Cookies.get('pa_token')
    const profileUrl = 'https://api.spotify.com/v1/me'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(profileUrl, options)

    const data = await response.json()
    const countryVal = data.country
    this.setState({getUserCountry: countryVal})
    this.getNewReleasesData()
  }

  getUpdatedNewData = eachItem => ({
    name: eachItem.name,
    id: eachItem.id,
    url: eachItem.images[0].url,
  })

  getNewReleasesData = async () => {
    const {getUserCountry} = this.state
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const accessToken = Cookies.get('pa_token')
    const newReleasesUrl = `https://api.spotify.com/v1/browse/new-releases?country=${getUserCountry}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
    const responseNewRelease = await fetch(newReleasesUrl, options)
    const dataNewReleases = await responseNewRelease.json()
    // console.log(dataNewReleases)
    if (responseNewRelease.ok === true) {
      const updatedNewRelease = dataNewReleases.albums.items.map(eachItem =>
        this.getUpdatedNewData(eachItem),
      )
      this.setState({
        newReleasesList: updatedNewRelease,
        apiStatus: apiStatusConstants.success,
      })
      // console.log(updatedNewRelease)
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

export default NewReleasesHome
