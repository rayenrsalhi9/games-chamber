import { useState, useEffect } from "react"

export type User = {
    name: string
    id: number
}

export const useMe = () => {
    const [user, setUser] = useState<User | null >(null)

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch('/api/auth/me')
                const data = await res.json()
                if (data.error) throw new Error(data.error)
                if (data.success) setUser({ name: data.name, id: data.id })
            } catch (error) {
                console.error('Error fetching user details:', error)
            }
        }
        fetchUser()
    }, [])

    return user
}