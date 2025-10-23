import { useState, useEffect } from "react"

export const useMe = () => {
    const [userName, setUserName] = useState<string | '' >('')

    useEffect(() => {
        fetch('/api/auth/me')
            .then(res => res.json())
            .then(data => setUserName(data.name))
    }, [])

    return userName
}