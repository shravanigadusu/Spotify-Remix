import GenreHome from '../GenreHome'
import Header from '../Header'
import NewReleasesHome from '../NewReleasesHome'
import EditorPicksHome from '../EditorPicksHome'
import './index.css'

const SpotifyClone = () => (
  <div className="home-bg-container">
    <Header />
    <EditorPicksHome />
    <GenreHome />
    <NewReleasesHome />
  </div>
)

export default SpotifyClone
