import {Component} from 'react'
import moment from 'moment'
import Cookies from 'js-cookie'
import LoadingView from '../LoadingView'
import FailedView from '../FailedView'
import EditorsCard from '../EditorsCard'
import './index.css'

const apiStatusConstants = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'PROGRESS',
  initial: 'INITIAL',
}

class EditorPicksHome extends Component {
  state = {
    newEditorPicksList: {},
    apiStatus: apiStatusConstants.initial,
    country: '',
  }

  componentDidMount() {
    this.getCountryValue()
  }

  renderSuccessView = () => {
    const {newEditorPicksList} = this.state
    return (
      <div className="list-container-editor">
        <h1 className="editor-heading">Editor`s Picks</h1>
        <ul className="editor-ul-list">
          {newEditorPicksList.map(eachItemDetail => (
            <EditorsCard
              eachDetailsOfItem={eachItemDetail}
              key={eachItemDetail.id}
            />
          ))}
        </ul>
      </div>
    )
  }

  renderFailureView = () => <FailedView />

  renderLoadingView = () => <LoadingView />

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
    this.setState({country: countryVal})
    this.getEditorPicsData()
  }

  getUpdatedEditorData = eachItem => [
    {
      name: eachItem.name,
      id: eachItem.id,
      url: eachItem.images[0].url,
    },
  ]

  getEditorPicsData = async () => {
    const {country} = this.state
    const timestamp = moment(new Date()).format('YYYY-MM-DDTHH:00:00')
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const accessToken = Cookies.get('pa_token')
    const editorUrl = `https://api.spotify.com/v1/browse/featured-playlists?country=${country}&timestamp=${timestamp}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
    const responseEditorsPicks = await fetch(editorUrl, options)
    const dataEditorsPicks = await responseEditorsPicks.json()
    console.log(dataEditorsPicks)
    if (responseEditorsPicks.ok === true) {
      const updatedEditorsPicks = dataEditorsPicks.playlists.items.map(
        eachItem => this.getUpdatedEditorData(eachItem),
      )
      this.setState({
        newEditorPicksList: updatedEditorsPicks,
        apiStatus: apiStatusConstants.success,
      })
      console.log(updatedEditorsPicks)
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

export default EditorPicksHome
