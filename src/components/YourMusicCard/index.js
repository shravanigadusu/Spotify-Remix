import './index.css'

const YourMusicCard = props => {
  const {MusicDetail, onDisplayPlaySong} = props
  const {name, durationMs, songUrl, type, previewUrl} = MusicDetail[0]
  let namesOfArtists = []

  const getValue = eachItem => {
    namesOfArtists.push(eachItem.Aname)
    return namesOfArtists
  }

  namesOfArtists = MusicDetail[0].artists.map(eachItem => getValue(eachItem))

  const timeInMin = durationMs / 60000
  const minIntegerPart = Math.trunc(timeInMin)
  const timeInSec = durationMs % 60000
  const secTwoDecimalPart =
    timeInSec < 10000
      ? Math.trunc(timeInSec / 100)
      : Math.trunc(timeInSec / 1000)

  const viewPlayedYM = () => {
    onDisplayPlaySong(name, previewUrl, namesOfArtists, type, songUrl)
  }
  return (
    <li className="MusicCard-li-element" onClick={viewPlayedYM}>
      <img src={songUrl.url} alt="songUrl" className="song-image-styling" />
      <div className="song-information">
        <h1 className="song-name">{name}</h1>
        <p className="song-artists">{namesOfArtists[0]}</p>
      </div>
      <div className="time-container">
        <p className="song-time">{`${minIntegerPart}:${secTwoDecimalPart}`}</p>
      </div>
    </li>
  )
}

export default YourMusicCard
