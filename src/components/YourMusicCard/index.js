import './index.css'

const YourMusicCard = props => {
  const {MusicDetail} = props
  const {name, durationMs, songUrl} = MusicDetail[0]
  let namesOfArtists = []

  const getValue = eachItem => {
    namesOfArtists.push(eachItem.Aname)
    return namesOfArtists
  }

  namesOfArtists = MusicDetail[0].artists.map(eachItem => getValue(eachItem))

  const timeInMin = durationMs / 60000
  const minIntegerPart = Math.trunc(timeInMin)
  const timeInSec = durationMs % 60000
  const secTwoDecimalPart = Math.trunc(timeInSec / 100)

  return (
    <li className="MusicCard-li-element">
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
