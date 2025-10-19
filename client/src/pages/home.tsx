import Header from '@/components/header'
import Footer from '@/components/footer'

const Home = () => {
  return (
    <div className="min-h-screen bg-black text-white">

      <Header />
      
      <main className="flex flex-col items-center justify-center py-20 px-6">
        
        <div className="mb-8">
          <div className="w-48 h-48 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
            <span className="font-pixel text-6xl text-white">GC</span>
          </div>
        </div>

        <h1 className="text-5xl font-bold mb-4 font-pixel retro-text text-center">
          GAME CHAMBER
        </h1>

        <p className="text-lg text-purple-300 text-center max-w-2xl font-mono">
          Echoes of the old-school arcade room
        </p>
      </main>

      <Footer />

    </div>
  )
}

export default Home
