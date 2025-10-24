import placeholderImage from '/placeholder.svg'

type Product = {
  id: number
  title: string
  provider: string
  year: number
  stock: number
  price: number
  genre: string
  image: string
}

type ProductProps = {
  product: Product
  userId: number | undefined
}

const ProductCard = ({ product, userId }: ProductProps) => {

  const addProductToCart = async(productId: number) => {
    try {
      const res = await fetch('/api/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({productId, userId})
      })
      const data = await res.json()
      if (data.error) throw new Error(data.message)
    } catch(err) {
      console.error('An error occured adding product: ', err)
    }
  }

  return (
    <div className="bg-black border-2 border-purple-800 rounded-lg shadow-lg shadow-purple-900/50 hover:shadow-purple-700/60 transition-all duration-300 hover:scale-105 overflow-hidden crt-container">
      <div className="relative">
        <img
          src={product.image || placeholderImage}
          alt={product.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 right-2 bg-purple-900/90 px-2 py-1 rounded text-xs font-mono text-purple-300">
          {product.genre}
        </div>
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
            <span className="text-red-500 font-pixel text-lg">OUT OF STOCK</span>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="text-xl font-bold font-pixel text-purple-300 mb-2">
          {product.title}
        </h3>
        
        <div className="space-y-2 text-sm">
          <div className="flex justify-between items-center">
            <span className="text-purple-400 font-mono">Provider:</span>
            <span className="text-white font-mono">{product.provider}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-purple-400 font-mono">Year:</span>
            <span className="text-white font-mono">{product.year}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-purple-400 font-mono">Stock:</span>
            <span className={`font-mono ${product.stock > 0 ? 'text-green-400' : 'text-red-400'}`}>
              {product.stock > 0 ? `${product.stock} available` : 'Out of stock'}
            </span>
          </div>
        </div>
        
        <div className="mt-4 flex justify-between items-center">
          <span className="text-2xl font-bold text-green-400 font-mono">
            ${product.price.toFixed(2)}
          </span>
          
          <button
            className={`retro-button px-4 py-2 text-sm ${
              product.stock === 0 
                ? 'opacity-50 cursor-not-allowed hover:bg-black hover:text-purple-300' 
                : ''
            }`}
            onClick={() => addProductToCart(product.id)}
            disabled={product.stock === 0}
          >
            ADD TO CART
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard