import './index.css'

const PageOfPlaylist = props => {
  const {eachDetailsOfItems} = props
  const {name} = eachDetailsOfItems
  const classNameValue2 = name.startsWith('My')
    ? 'no-display-song'
    : 'display-song'
  return (
    <li className={classNameValue2}>
      <div className="image-container1">
        <div className="line-one1">
          <img
            src="https://i.scdn.co/image/ab67706c0000bebb5a47235d07c5a01c44a62093"
            alt="thumb-nail"
            className="thumb-nail1"
          />
          <img
            src="https://i.scdn.co/image/ab67616d0000b273da50894e074ecd5ce61de0a1"
            alt="thumb-nail"
            className="thumb-nail1"
          />
        </div>
        <div className="line-one1">
          <img
            src="https://i.scdn.co/image/ab67706c0000bebb8874419a00a33f0e2263bf12"
            alt="thumb-nail"
            className="thumb-nail1"
          />
          <img
            src="https://i.scdn.co/image/ab67706c0000bebb994fe1bb0e016acea38f176f"
            alt="thumb-nail"
            className="thumb-nail1"
          />
        </div>
      </div>

      <p className="song-style-name">{name}</p>
    </li>
  )
}

export default PageOfPlaylist
