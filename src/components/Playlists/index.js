import {Component} from 'react'
import Cookies from 'js-cookie'
import {MdOutlineArrowBack} from 'react-icons/md'
import LoadingView from '../LoadingView'
import FailedView from '../FailedView'
import Header from '../Header'
import PageOfPlaylist from '../PageOfPlaylist'
import './index.css'

const apiStatusConstants = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'PROGRESS',
  initial: 'INITIAL',
}

class Playlists extends Component {
  state = {
    list1: {},
    apiStatus: apiStatusConstants.initial,
    username: '',
    lenVal: '',
    clickVal: false,
  }

  componentDidMount() {
    this.getUserNameValue()
  }

  getDataOfPlaylists = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {username} = this.state
    const token = Cookies.get('pa_token')
    const playlistUrl = `https://api.spotify.com/v1/users/${username}/playlists?limit=50`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const playlistResponse = await fetch(playlistUrl, options)
    const playlistData = await playlistResponse.json()
    console.log(playlistData)
    if (playlistResponse.ok === true) {
      const updatedData = playlistData.items.map(eachItem => ({
        name: eachItem.name,
        images: eachItem.images,
      }))
      const lengthVal = updatedData.length
      this.setState({
        list1: updatedData,
        apiStatus: apiStatusConstants.success,
        lenVal: lengthVal,
      })
      console.log(updatedData)
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  getUserNameValue = async () => {
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
    const userNameVal = data.id
    this.setState({username: userNameVal})
    console.log(userNameVal)
    this.getDataOfPlaylists()
  }

  renderFailureView = () => <FailedView />

  renderLoadingView = () => <LoadingView />

  getListOfPlaylists = () => {
    console.log('clicked')
    this.setState(prevState => ({clickVal: !prevState.clickVal}))
    this.renderSuccessView()
  }

  changeButtonVal = () => {
    this.setState(prevState => ({clickVal: !prevState.clickVal}))
    this.renderSuccessView()
  }

  renderBackButton = () => (
    <div className="SH-bg-container">
      <button
        type="button"
        className="back-container button-stylee"
        onClick={this.changeButtonVal}
      >
        <MdOutlineArrowBack className="back-arrow" />
        <p className="back-text">Back</p>
      </button>
    </div>
  )

  renderSuccessView = () => {
    const {clickVal, list1, lenVal} = this.state
    const classStyleValue = clickVal ? 'things-container2' : 'thing-container'
    const classStyle2 = clickVal ? 'displayList' : 'notDisplayList'
    return (
      <>
        {clickVal ? this.renderBackButton() : <Header />}
        <div className="playlist-bg-container">
          <h1 className="playlist-heading">Your Playlists</h1>
          <button
            type="button"
            className={classStyleValue}
            onClick={this.getListOfPlaylists}
          >
            <div className="image-container">
              <div className="line-one">
                <img
                  src={list1[2].images[0].url}
                  alt="thumb-nail"
                  className="thumb-nail"
                />
                <img
                  src={list1[3].images[0].url}
                  alt="thumb-nail"
                  className="thumb-nail"
                />
              </div>
              <div className="line-one">
                <img
                  src={list1[4].images[0].url}
                  alt="thumb-nail"
                  className="thumb-nail"
                />
                <img
                  src={list1[5].images[0].url}
                  alt="thumb-nail"
                  className="thumb-nail"
                />
              </div>
            </div>
            <div className="info-container">
              <p className="para-style">{list1[0].name}</p>
              <p className="count-style">{lenVal} Tracks</p>
            </div>
          </button>
          <ul className={classStyle2}>
            {list1.map(eachItemDetails => (
              <PageOfPlaylist eachDetailsOfItems={eachItemDetails} />
            ))}
          </ul>
        </div>
      </>
    )
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

export default Playlists
