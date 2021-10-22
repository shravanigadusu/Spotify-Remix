import {Link} from 'react-router-dom'
import './index.css'

const EditorsCard = props => {
  const {eachDetailsOfItem} = props
  const {name, url, id} = eachDetailsOfItem[0]

  return (
    <Link to={`/playlists/${id}`} className="Editor-link">
      <li className="editor-li-element">
        <img src={url} alt="logo-1" className="image-editor" />
        <p className="editor-name">{name}</p>
      </li>
    </Link>
  )
}

export default EditorsCard
