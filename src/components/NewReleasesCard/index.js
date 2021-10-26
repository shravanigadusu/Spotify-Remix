import {Link} from 'react-router-dom'
import './index.css'

const NewReleasesCard = props => {
  const {eachDetail} = props
  const {name, url, id} = eachDetail

  return (
    <Link to={`/albums/${id}`} className="Editor-link">
      <li className="new-release-li-element">
        <img src={url} alt="logo" className="image-genre" />
        <p className="new-release-name">{name}</p>
      </li>
    </Link>
  )
}

export default NewReleasesCard
