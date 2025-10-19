import {connectDB} from '../sql/connect-db.js'

const getGenres = async() => {
    try {
        const db = await connectDB()
        const genres = await db.all(`select distinct genre from products`)
        return genres.map(e => e.genre)
    } catch (error) {
        console.log(error)
        return {data: null, error: error.message}
    }
}

const getProducts = async() => {
    try {
        const db = await connectDB()
        const products = await db.all('select * from products')
        return {data: products, error: null}
    } catch (error) {
        console.log(error)
        return {data: null, error: error.message}
    } finally {
        db.close()
    }
}

export {getGenres, getProducts}