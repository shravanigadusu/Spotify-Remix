import {Component} from 'react'
import Cookies from 'js-cookie'
import GenresCard from '../GenresCard'
import LoadingView from '../LoadingView'
import FailedView from '../FailedView'
import './index.css'

const apiStatusConstants = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'PROGRESS',
  initial: 'INITIAL',
}

class GenreHome extends Component {
  state = {genresMoodsList: {}, apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getGenresData()
  }

  renderSuccessView = () => {
    const {genresMoodsList} = this.state
    // console.log(genresMoodsList.categories.items)
    return (
      <div className="list-container">
        <h1 className="genres-heading">Genres & Moods</h1>
        <ul className="genres-ul-list">
          {genresMoodsList.categories.items.map(eachItem => (
            <GenresCard eachDetail={eachItem} key={eachItem.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderFailureView = () => <FailedView />

  renderLoadingView = () => <LoadingView />

  getGenresData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const accessToken = Cookies.get('pa_token')
    const genresUrl = 'https://api.spotify.com/v1/browse/categories'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
    const responseGenre = await fetch(genresUrl, options)
    if (responseGenre.ok === true) {
      const dataGenre = await responseGenre.json()
      this.setState({
        genresMoodsList: dataGenre,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  render() {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }
}
export default GenreHome
