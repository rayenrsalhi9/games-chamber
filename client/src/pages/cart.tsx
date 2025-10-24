import ResponsiveNav from '@/components/responsive-nav'
import { useSearchParams } from 'react-router-dom'
import { useMe } from '@/hooks/useMe'

const Cart = () => {
  
  const [searchParams, setSearchParams] = useSearchParams()
  const search = searchParams.get('search') || ''
  const user = useMe()

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams({search:e.target.value})
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <ResponsiveNav 
        userName={user?.name || ''}
        search={search} 
        handleSearchChange={handleSearchChange} 
      />
      <section className="w-full h-screen flex items-center justify-center pt-20">
        <h1 className="text-4xl font-bold font-pixel text-purple-300">Cart</h1>
      </section>
    </div>
  )
}

export default Cart