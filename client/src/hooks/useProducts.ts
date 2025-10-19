import { useState, useEffect } from 'react'

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

export const useProducts = () => {
    const [products, setProducts] = useState<Product[]>([])

    useEffect(() => {
        fetch('/api/products')
            .then(res => res.json())
            .then(data => setProducts(data.data))
    }, [])

    return products
}