import {Component} from 'react'
import SongsList from '../SongsList'
import ShortHeader from '../ShortHeader'
import './index.css'

class DisplayDetailedView extends Component {
  state = {
    playedSongName: '',
    playedUrl: '',
    valPresent: false,
    playedArtists: '',
    typeSong: '',
  }

  render() {
    const onDisplayPlayedSong = (nameS, playUrl, playArtist, songType) => {
      console.log(nameS, playUrl)
      this.setState({
        playedSongName: nameS,
        playedUrl: playUrl,
        valPresent: true,
        playedArtists: playArtist,
        typeSong: songType,
      })
      if (playUrl === null) {
        alert('Your Browser Does Not Support This')
      }
    }

    const {eachSongDetail} = this.props
    const {description, imageUrl, name, tracks} = eachSongDetail
    const {
      playedSongName,
      playedUrl,
      valPresent,
      playedArtists,
      typeSong,
    } = this.state

    return (
      <>
        <ShortHeader />

        <div className="songs-container-bg">
          <img src={imageUrl} alt="sing-logo" className="song-image" />
          <p className="song-name-detail">{name}</p>
          <p className="song-desc-style">{description}</p>
          <ul className="song-ul-list">
            {tracks.map(eachSongTrack => (
              <SongsList
                eachDetails={eachSongTrack}
                onDisplayPlayedSong={onDisplayPlayedSong}
              />
            ))}
          </ul>
          {valPresent && playedUrl !== null ? (
            <div className="playing-song">
              <img
                src={imageUrl}
                alt="song-logo"
                className="song-played-image"
              />
              <div className="sName-aName-styling">
                <p className="playing-song-style">{playedSongName}</p>
                <p className="playing-a-style">
                  {playedArtists[0][0].artistName}
                </p>
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
}

export default DisplayDetailedView
