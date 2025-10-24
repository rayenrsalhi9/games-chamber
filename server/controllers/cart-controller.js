import {connectDB} from '../sql/connect-db.js'

export const addToCart = async(req, res) => {

    const {productId} = req.body
    if (!productId) return res.status(400).json({error: true, message: 'Invalid product id'})

    const userId = req.session.userId
    if (!userId) return res.status(400).json({error: true, message: 'User not logged in'})

    try {
        const db = await connectDB()

        const doesProductExist = await db.get(
            'SELECT * FROM cart_items WHERE user_id = ? AND product_id = ?', 
            [userId, productId]
        )

        if (doesProductExist) {
            await db.run(
                'UPDATE cart_items SET quantity = quantity + 1 WHERE user_id = ? AND product_id = ?',
                [userId, productId]
            )
        } else {
            await db.run('INSERT INTO cart_items (user_id, product_id) VALUES (?, ?)', [userId, productId])
        }

        res.status(200).json({success: true, message: 'Product added to cart'})

    } catch (error) {
        res.status(500)
            .json({error: true, message: 'Could not add product to cart'})
    }
}