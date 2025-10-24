import { useState, useEffect } from "react"

export const useMe = () => {
    const [userName, setUserName] = useState<string | '' >('')

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch('/api/auth/me')
                const data = await res.json()
                if (data.error) throw new Error(data.error)
                if (data.success) setUserName(data.name)
            } catch (error) {
                console.error('Error fetching user details:', error)
            }
        }
        fetchUser()
    }, [])

    return userName
}