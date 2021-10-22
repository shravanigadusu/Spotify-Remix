import './index.css'
import Header from '../Header'

const FailedView = () => (
  <div className="failed-bg-container">
    <Header />
    <div className="failed-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/spotify-remix-login-music.png"
        className="failed-image-logo"
        alt="website logo"
      />
      <h1 className="failed-text">Oops Something Went Wrong !</h1>
      <p className="failed-description">
        We are unable to process your request.
      </p>
    </div>
  </div>
)

export default FailedView
