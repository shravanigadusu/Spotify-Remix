import {Component} from 'react'
import './index.css'

class SongsList extends Component {
  state = {played: false}
  // <audio controls>
  //   <source src={previewUrl} type="audio" />
  //  <track
  //   src="captions_en.vtt"
  //   kind="captions"
  //  srcLang="en"
  //  label="english_captions"
  //   />
  //  </audio>

  render() {
    const {eachDetails, onDisplayPlayedSong} = this.props
    const {songName, artists, durationMs, previewUrl, type} = eachDetails
    const timeInMin = durationMs / 60000
    const minIntegerPart = Math.trunc(timeInMin)
    const timeInSec = durationMs % 60000
    const secTwoDecimalPart =
      timeInSec < 10000
        ? Math.trunc(timeInSec / 100)
        : Math.trunc(timeInSec / 1000)
    const viewPlayedSong = () => {
      //  const {id} = eachDetails
      onDisplayPlayedSong(songName, previewUrl, artists, type)
    }

    return (
      <li className="song-li-element" onClick={viewPlayedSong}>
        <div className="name-and-artists-container">
          <p className="song-name-styling">{songName}</p>
          <p className="artists-name-styling">{artists[0][0].artistName}</p>
        </div>
        <p className="song-times">{`${minIntegerPart}:${secTwoDecimalPart}`}</p>
      </li>
    )
  }
}
export default SongsList
