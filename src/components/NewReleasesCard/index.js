import './index.css'

const NewReleasesCard = props => {
  const {eachDetail} = props
  const {name, url} = eachDetail

  return (
    <li className="new-release-li-element">
      <img src={url} alt="logo" className="image-genre" />
      <p className="new-release-name">{name}</p>
    </li>
  )
}

export default NewReleasesCard
