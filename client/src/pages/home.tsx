import icon from '/icon.png'
import { useSearchParams } from 'react-router-dom'
import { useGenres } from '@/hooks/useGenres'
import { useProducts } from '@/hooks/useProducts'
import ResponsiveNav from '@/components/responsive-nav'
import Footer from '@/components/footer'
import ProductCard from '@/components/product'

const Home = () => {

  const [searchParams, setSearchParams] = useSearchParams()
  const genre = searchParams.get('genre') || ''
  const search = searchParams.get('search') || ''

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams({genre,search:e.target.value})
  }

  const handleGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchParams({genre:e.target.value,search})
  }

  const genres = useGenres()
  const {products} = useProducts(genre, search)

  return (
    <div className="min-h-screen bg-black text-white">
      
      <ResponsiveNav search={search} handleSearchChange={handleSearchChange} />
      
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
          onChange={handleGenreChange}
          className="px-3 py-2 bg-black text-white border border-purple-800 rounded focus:outline-none focus:border-purple-600 font-mono text-sm"
        >
          <option value="">All Genres</option>
          {
            genres.map(g => <option key={g} value={g} selected={g.toLowerCase() === genre.toLowerCase()}>{g}</option>)
          }
        </select>
      </section>

      {/* Products Section */}
      <section className="px-6 py-10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8 font-pixel text-purple-300">
            RETRO GAMES COLLECTION
          </h2>
          
          {products.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-purple-400 font-mono text-lg">No products available</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />

    </div>
  )
}

export default Home
