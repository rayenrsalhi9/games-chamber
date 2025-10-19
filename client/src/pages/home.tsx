import { useGenres } from '@/hooks/useGenres'
import icon from '/icon.png'
import Header from '@/components/header'
import Footer from '@/components/footer'

const Home = () => {

  const genres = useGenres()

  return (
    <div className="min-h-screen bg-black text-white">

      <Header />
      
      <main className="flex items-center justify-center gap-10 pt-20 pb-10 px-6">
        
        <div className="mb-8 p-4 bg-purple-900/20 border border-purple-800 rounded-lg shadow-lg shadow-purple-900/50">
          <img src={icon} alt="Game Chamber Icon" className="w-48 h-48 object-contain rounded-lg" />
        </div>

        <div>
          <h1 className="text-5xl font-bold mb-4 font-pixel retro-text text-center">
            GAME CHAMBER
          </h1>

          <p className="text-lg text-purple-300 text-center max-w-2xl font-mono">
            Echoes of the old-school arcade room
          </p>
        </div>

      </main>

      <section className="flex items-center justify-center gap-4 py-10">
        <label htmlFor="genre" className="block text-lg font-bold text-purple-300 font-mono">
          Filter by genre
        </label>
        <select
          id="genre"
          className="px-3 py-2 bg-black text-white border border-purple-800 rounded focus:outline-none focus:border-purple-600 font-mono text-sm"
        >
          <option value="">All Genres</option>
          {
            genres.map(genre => <option key={genre} value={genre}>{genre}</option>)
          }
        </select>
      </section>

      <Footer />

    </div>
  )
}

export default Home
