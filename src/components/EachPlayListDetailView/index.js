import {Component} from 'react'
import Cookies from 'js-cookie'
import LoadingView from '../LoadingView'
import FailedView from '../FailedView'
import './index.css'

const apiStatusConstants = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'PROGRESS',
  initial: 'INITIAL',
}

class EachPlayListDetailView extends Component {
  state = {
    eachPlaylistDetails: {},
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getPlaylistDetails()
  }

  getArtistName = eachArtist => [
    {
      artistName: eachArtist.name,
    },
  ]

  getTrackDetails = eachTrack => ({
    previewUrl: eachTrack.track.preview_url,
    songName: eachTrack.track.name,
    durationMs: eachTrack.track.duration_ms,
    artists: eachTrack.track.artists.map(eachArtist =>
      this.getArtistName(eachArtist),
    ),
  })

  renderSuccessView = () => {
    const {eachPlaylistDetails} = this.state
    return <h1>Your Songs</h1>
  }

  renderFailureView = () => <FailedView />

  renderLoadingView = () => <LoadingView />

  getPlaylistDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const token = Cookies.get('pa_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const playListDetailedUrl = `https://api.spotify.com/v1/users/spotify/playlists/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const detailedPlaylistResponse = await fetch(playListDetailedUrl, options)
    if (detailedPlaylistResponse.ok === true) {
      const detailedPlayListData = await detailedPlaylistResponse.json()
      console.log(detailedPlayListData)
      const updatedPlayList = {
        name: detailedPlayListData.name,
        description: detailedPlayListData.description,
        imageUrl: detailedPlayListData.images[0].url,
        tracks: detailedPlayListData.tracks.items.map(eachTrack =>
          this.getTrackDetails(eachTrack),
        ),
      }
      this.setState({
        apiStatus: apiStatusConstants.success,
        eachPlaylistDetails: updatedPlayList,
      })

      console.log(updatedPlayList)
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
