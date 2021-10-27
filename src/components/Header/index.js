import {Component} from 'react'
import {Link} from 'react-router-dom'
import {MdMenu, MdHome, MdQueueMusic, MdClose} from 'react-icons/md'
import {BsPersonFill} from 'react-icons/bs'
import {FaMusic} from 'react-icons/fa'
import './index.css'

class Header extends Component {
  state = {isClicked: false}

  menuOptionClicked = () => {
    this.setState(prevState => ({isClicked: !prevState.isClicked}))
  }

  render() {
    const {isClicked} = this.state
    return (
      <div className="header-bg-container">
        {isClicked ? (
          <>
            <Link to="/profile">
              <BsPersonFill
                className="person-icon"
                onClick={this.menuOptionClicked}
              />
            </Link>
            <Link to="/">
              <MdHome
                className="person-icon"
                onClick={this.menuOptionClicked}
              />
            </Link>
            <Link to="/yourMusic">
              <FaMusic
                className="person-icon size-style"
                onClick={this.menuOptionClicked}
              />
            </Link>
            <Link to="/playlists">
              <MdQueueMusic
                className="person-icon "
                onClick={this.menuOptionClicked}
              />
            </Link>
            <MdClose className="menu-icon" onClick={this.menuOptionClicked} />
          </>
        ) : (
          <>
            <Link to="/profile">
              <img
                src="https://assets.ccbp.in/frontend/react-js/spotify-remix-login-music.png"
                className="login-website-logo-desktop-image2"
                alt="website logo"
              />
            </Link>
            <p className="mobile-view">**Mobile View**</p>
            <button
              type="button"
              className="menu-button"
              onClick={this.menuOptionClicked}
            >
              <MdMenu className="menu-icon" />
            </button>
          </>
        )}
      </div>
    )
  }
}

export default Header
