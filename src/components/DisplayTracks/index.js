import './index.css'

const DisplayTracks = props => {
  const {eachGenreMoodDetail} = props
  const {name, imageUrl, totalVal} = eachGenreMoodDetail

  return (
    <li className="genre-mood-li-element">
      <img src={imageUrl} alt="genre-mood" className="genre-mood-image" />
      <div className="genre-mood-info-container">
        <p className="genre-mood-name">{name}</p>
        <p className="genre-mood-count-track">{totalVal} Tracks</p>
      </div>
    </li>
  )
}

export default DisplayTracks
