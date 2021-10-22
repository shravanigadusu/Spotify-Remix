import {Component} from 'react'
import Cookies from 'js-cookie'
import LoadingView from '../LoadingView'
import FailedView from '../FailedView'
import Header from '../Header'
import YourMusicCard from '../YourMusicCard'
import './index.css'

const apiStatusConstants = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'PROGRESS',
  initial: 'INITIAL',
}

class YourMusic extends Component {
  state = {yourMusicList: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getYourMusicData()
  }

  renderSuccessView = () => {
    const {yourMusicList} = this.state
    console.log(yourMusicList)
    return (
      <div className="yourMusic-bg-container">
        <Header />
        <div className="yourMusicList-container">
          <h1 className="yourMusic-heading">Your Music</h1>
          <ul className="yourMusic-ul-list">
            {yourMusicList.map(eachMusicItem => (
              <YourMusicCard
                MusicDetail={eachMusicItem}
                key={eachMusicItem.id}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  renderFailureView = () => <FailedView />

  renderLoadingView = () => <LoadingView />

  getArtistsName = eachArtists => ({
    Aname: eachArtists.name,
  })

  convertDataToCamelCase = eachItem => [
    {
      name: eachItem.track.name,
      songUrl: eachItem.track.album.images[0],
      previewUrl: eachItem.track.preview_url,
      durationMs: eachItem.track.duration_ms,
      id: eachItem.track.id,
      artists: eachItem.track.artists.map(eachArtists =>
        this.getArtistsName(eachArtists),
      ),
    },
  ]

  getYourMusicData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const accessToken = Cookies.get('pa_token')
    const yourMusicUrl = 'https://api.spotify.com/v1/me/tracks'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
    const responseYourMusic = await fetch(yourMusicUrl, options)
    const dataYourMusic = await responseYourMusic.json()
    console.log(dataYourMusic)
    console.log(dataYourMusic.items[0].track)
    if (responseYourMusic.ok === true) {
      const updatedData = dataYourMusic.items.map(eachItem =>
        this.convertDataToCamelCase(eachItem),
      )
      this.setState({
        yourMusicList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
      console.log(updatedData)
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

export default YourMusic
