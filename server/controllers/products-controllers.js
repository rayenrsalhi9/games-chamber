import {connectDB} from '../sql/connect-db.js'

const getGenres = async(req, res) => {
    try {
        const db = await connectDB()
        const genresRows = await db.all(`select distinct genre from products`)
        const genres = genresRows.map(e => e.genre)
        res.json({data: genres, error: null})
    } catch (error) {
        console.log(error)
        res.json({data: null, error: error.message})
    }
}

const getProducts = async(req, res) => {

    const {genre, search} = req.query
    
    const params = genre && search 
    ? [`${genre}`, `%${search}%`] 
    : genre ? [`${genre}`] 
    : search ? [`%${search}%`] 
    : []

    const query = genre && search
        ? `select * from products where genre = ? and title like ?` 
        : genre 
        ? `select * from products where genre = ?` 
        : search 
        ? `select * from products where title like ?`
        : 'select * from products'
   
    try {
        const db = await connectDB()
        const products = await db.all(query, params)
        res.json({data: products, error: null})
    } catch (error) {
        console.log(error)
        res.json({data: null, error: error.message})
    }
}

export {getGenres, getProducts}