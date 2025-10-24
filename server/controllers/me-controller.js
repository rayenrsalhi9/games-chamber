import {connectDB} from '../sql/connect-db.js'

export const getUserDetails = async (req, res) => {

    const userId = req.session.userId
    if (!userId) return res.json({ isLoggedIn: false })

    try {

        const db = await connectDB()

        const data = await db.get('SELECT id, name FROM users WHERE id = ?', [userId])

        res.status(200).json({ success: true, name: data.name, id: data.id })  

    } catch (error) {
        console.error('Error fetching user details:', error)
        res.status(500).json({ error: 'Internal server error' })      
    }

}
