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

export const useProducts = (genre: string) => {
    const [products, setProducts] = useState<Product[]>([])

    const url = genre ? `/api/products?genre=${genre}` : '/api/products'

    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => setProducts(data.data))
    }, [url])

    return {products}
}