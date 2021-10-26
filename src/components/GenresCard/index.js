import {Component} from 'react'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import './index.css'

class GenresCard extends Component {
  state = {getUserCountry: ''}

  componentDidMount() {
    this.getCountryValue()
  }

  getCountryValue = async () => {
    const token = Cookies.get('pa_token')
    const profileUrl = 'https://api.spotify.com/v1/me'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(profileUrl, options)

    const data = await response.json()
    const countryVal = data.country
    this.setState({getUserCountry: countryVal})
  }

  render() {
    const {getUserCountry} = this.state
    const {eachDetail} = this.props
    const {icons, id} = eachDetail
    const {url} = icons[0]

    return (
      <Link to={`/categories/${id}/playlists?country=${getUserCountry}`}>
        <li className="genres-li-element">
          <img src={url} alt="logo" className="image-genre" />
        </li>
      </Link>
    )
  }
}

export default GenresCard
