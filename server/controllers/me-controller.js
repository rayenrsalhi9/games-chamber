import {connectDB} from '../sql/connect-db.js'

export const getUserDetails = async (req, res) => {

    const userId = req.session.userId
    if (!userId) return res.status(401).json({ isLoggedIn: false })

    try {

        const db = await connectDB()

        const data = await db.get('SELECT name FROM users WHERE id = ?', [userId])

        res.status(200).json({ isLoggedIn: true, name: data.name })  

    } catch (error) {

        console.error('Error fetching user details:', error)
        res.status(500).json({ message: 'Internal server error' })
        
    }

}
