import {Component} from 'react'
import Cookies from 'js-cookie'
import LoadingView from '../LoadingView'
import FailedView from '../FailedView'
import DisplayDetailedView from '../DisplayDetailedView'
import './index.css'

const apiStatusConstants = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'PROGRESS',
  initial: 'INITIAL',
}

class EachPlayListDetailView extends Component {
  state = {
    ListDetails: {},
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getDetails()
  }

  getArtistName = eachArtist => [
    {
      artistName: eachArtist.name,
    },
  ]

  getTrackDetails = eachTrack => ({
    previewUrl: eachTrack.preview_url,
    songName: eachTrack.name,
    durationMs: eachTrack.duration_ms,
    type: eachTrack.type,
    id: eachTrack.id,
    artists: eachTrack.artists.map(eachArtist =>
      this.getArtistName(eachArtist),
    ),
  })

  renderSuccessView = () => {
    const {ListDetails} = this.state
    return <DisplayDetailedView eachSongDetail={ListDetails} />
  }

  renderFailureView = () => <FailedView />

  renderLoadingView = () => <LoadingView />

  getDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const token = Cookies.get('pa_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const detailedUrl = `https://api.spotify.com/v1/albums/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(detailedUrl, options)
    console.log(response)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const updatedList = {
        name: data.name,
        description: data.label,
        imageUrl: data.images[0].url,
        tracks: data.tracks.items.map(eachTrack =>
          this.getTrackDetails(eachTrack),
        ),
      }
      this.setState({
        apiStatus: apiStatusConstants.success,
        ListDetails: updatedList,
      })

      console.log(updatedList)
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

export default EachPlayListDetailView
