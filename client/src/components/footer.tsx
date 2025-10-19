

const Footer = () => {
    return(
        <footer className="bg-black border-t border-purple-800">
            <div className="px-6 py-6">
                <div className="max-w-6xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-purple-600 rounded flex items-center justify-center">
                                <span className="font-pixel text-xs text-white">GC</span>
                            </div>
                            <div>
                                <h3 className="text-sm font-bold retro-text font-pixel">GAME CHAMBER</h3>
                                <p className="text-xs text-purple-400 font-mono">Retro Arcade</p>
                            </div>
                        </div>
                        
                        <div className="flex items-center space-x-4 text-xs text-purple-400 font-mono">
                            <span>© {new Date().getFullYear()} GAME CHAMBER</span>
                            <span>|</span>
                            <span>RETRO EDITION</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer