import {Link} from 'react-router-dom'
import {MdOutlineArrowBack} from 'react-icons/md'
import './index.css'

const ShortHeader = () => (
  <div className="SH-bg-container">
    <Link to="/" className="no-style">
      <div className="back-container">
        <MdOutlineArrowBack className="back-arrow" />
        <p className="back-text">Back</p>
      </div>
    </Link>
  </div>
)

export default ShortHeader
