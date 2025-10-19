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

export const useProducts = (genre='', search='') => {
    const [products, setProducts] = useState<Product[]>([])

    const url = genre && search 
        ? `/api/products?genre=${genre}&search=${search}`
        : genre 
        ? `/api/products?genre=${genre}`
        : search 
        ? `/api/products?search=${search}`
        : '/api/products'

    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => setProducts(data.data))
    }, [url])

    return {products}
}