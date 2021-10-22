import './index.css'

const GenresCard = props => {
  const {eachDetail} = props
  const {icons} = eachDetail
  const {url} = icons[0]

  return (
    <li className="genres-li-element">
      <img src={url} alt="logo" className="image-genre" />
    </li>
  )
}

export default GenresCard
