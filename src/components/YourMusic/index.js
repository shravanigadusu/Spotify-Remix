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
  state = {
    yourMusicList: [],
    apiStatus: apiStatusConstants.initial,
    playedSongName: '',
    playedUrl: '',
    valPresent: false,
    playedArtists: '',
    typeSong: '',
    songImage: '',
  }

  componentDidMount() {
    this.getYourMusicData()
  }

  onDisplayPlaySong = (nameS, playUrl, playArtist, songType, songPic) => {
    console.log(nameS, playUrl)
    this.setState({
      playedSongName: nameS,
      playedUrl: playUrl,
      valPresent: true,
      playedArtists: playArtist[0],
      typeSong: songType,
      songImage: songPic.url,
    })

    if (playUrl === null) {
      alert('Your Browser Does Not Support This')
    }
  }

  renderSuccessView = () => {
    // const {yourMusicList} = this.state
    const {
      yourMusicList,
      playedSongName,
      playedUrl,
      valPresent,
      playedArtists,
      typeSong,
      songImage,
    } = this.state
    console.log(playedUrl)
    console.log(yourMusicList)
    return (
      <>
        <Header />
        <div className="yourMusic-bg-container">
          <h1 className="yourMusic-heading">Your Music</h1>
          <ul className="yourMusic-ul-list">
            {yourMusicList.map(eachMusicItem => (
              <YourMusicCard
                MusicDetail={eachMusicItem}
                key={eachMusicItem.id}
                onDisplayPlaySong={this.onDisplayPlaySong}
              />
            ))}
          </ul>

          {valPresent && playedUrl !== null ? (
            <div className="playing-songs">
              <img
                src={songImage}
                alt="song-logo"
                className="song-played-image"
              />
              <div className="sName-aName-styling">
                <p className="playing-song-style">{playedSongName}</p>
                <p className="playing-a-style">{playedArtists}</p>
              </div>

              <audio
                controls
                src={playedUrl}
                type={typeSong}
                className="audio-styling"
              >
                <track
                  src={playedUrl}
                  kind="captions"
                  srcLang="en"
                  label="english_captions"
                />
              </audio>
            </div>
          ) : null}
        </div>
      </>
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
      type: eachItem.track.type,
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
    //   console.log(dataYourMusic.items[0].track)
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
