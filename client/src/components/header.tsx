import { Link } from "react-router-dom"

interface HeaderProps {
  search: string
  setSelectedSearch: (search: string) => void
}

const Header = ({ search, setSelectedSearch }: HeaderProps) => {

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedSearch(e.target.value)
    }

    return(
        <header className="w-full bg-black border-b border-purple-800">
            <div className="flex justify-between items-center px-6 py-4">
                {/* Logo/Title Section */}
                <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-purple-600 rounded flex items-center justify-center">
                        <span className="font-pixel text-xs text-white">GC</span>
                    </div>
                    <div>
                        <h1 className="text-xl font-bold retro-text font-pixel">
                            GAME CHAMBER
                        </h1>
                        <p className="text-xs text-purple-400 font-mono">RETRO ARCADE</p>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex items-center space-x-4" aria-label="Main navigation">
                    <Link 
                        to="cart" 
                        className="retro-button px-4 py-2 text-sm"
                    >
                        CART
                    </Link>
                    <Link 
                        to="login" 
                        className="retro-button px-4 py-2 text-sm"
                    >
                        LOGIN
                    </Link>
                    
                    {/* Search Bar */}
                    <form role="search" className="flex items-center">
                        <label htmlFor="search" className="sr-only">Search for games</label>
                        <input
                            id="search"
                            name="search"
                            type="text"
                            value={search}
                            onChange={handleSearch}
                            placeholder="Search..."
                            className="px-3 py-2 bg-black text-white placeholder-purple-400 border border-purple-800 rounded focus:outline-none focus:border-purple-600 font-mono text-sm w-40 focus:w-48 transition-all duration-200"
                        />
                    </form>
                </nav>
            </div>
        </header>
    )
}

export default Header