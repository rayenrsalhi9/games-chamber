import { useEffect, useState } from "react";

export const useCartCount = () => {
    
    const [cartCount, setCartCount] = useState(0)

    useEffect(() => {
        const getCartCount = async() => {
            try {
                const res = await fetch('/api/cart/count')
                const data = await res.json()
                if (data.error) throw new Error(data.error)
                if (data.success) setCartCount(data.count)
            } catch(err) {
                console.error('An error occured getting count: ', err)
            }
        }
        getCartCount()
    }, [])

    return {cartCount, setCartCount}

}