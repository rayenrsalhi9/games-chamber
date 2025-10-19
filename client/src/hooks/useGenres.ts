import { useState, useEffect } from "react";

export const useGenres = () => {
    const [genres, setGenres] = useState<string[]>([])

    useEffect(() => {
        fetch('/api/products/genres')
            .then(res => res.json())
            .then(data => setGenres(data.data))
    }, [])

    return genres
}
