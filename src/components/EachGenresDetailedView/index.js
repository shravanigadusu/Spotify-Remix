import {Component} from 'react'
import Cookies from 'js-cookie'
import LoadingView from '../LoadingView'
import FailedView from '../FailedView'
import DisplayTracks from '../DisplayTracks'
import ShortHeader from '../ShortHeader'
import './index.css'

const apiStatusConstants = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'PROGRESS',
  initial: 'INITIAL',
}

class EachGenresDetailedView extends Component {
  state = {
    eachGenresDetails: {},
    apiStatus: apiStatusConstants.initial,
    getUserCountry: '',
  }

  componentDidMount() {
    this.getCountryValue()
  }

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
    this.getGenresEachData()
  }

  renderSuccessView = () => {
    const {eachGenresDetails} = this.state
    return (
      <>
        <ShortHeader />
        <div className="genre-detailed-bg-container">
          <h1 className="genres-and-mood-heading">Genres & Moods</h1>
          <ul className="genres-mood-ul-list">
            {eachGenresDetails.map(eachItem => (
              <DisplayTracks eachGenreMoodDetail={eachItem} />
            ))}
          </ul>
        </div>
      </>
    )
  }

  renderFailureView = () => <FailedView />

  renderLoadingView = () => <LoadingView />

  getGenresEachData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const token = Cookies.get('pa_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const {getUserCountry} = this.state
    const detailedUrl = `https://api.spotify.com/v1/browse/categories/${id}/playlists?country=${getUserCountry}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const detailedGenreResponse = await fetch(detailedUrl, options)
    if (detailedGenreResponse.ok === true) {
      const detailedGenreData = await detailedGenreResponse.json()
      console.log(detailedGenreData)
      const updatedPlayList = detailedGenreData.playlists.items.map(
        eachItem => ({
          name: eachItem.name,
          imageUrl: eachItem.images[0].url,
          totalVal: eachItem.tracks.total,
        }),
      )
      console.log(updatedPlayList)
      this.setState({
        apiStatus: apiStatusConstants.success,
        eachGenresDetails: updatedPlayList,
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

export default EachGenresDetailedView
