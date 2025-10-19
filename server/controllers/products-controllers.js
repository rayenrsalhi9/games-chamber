import {connectDB} from '../sql/connect-db.js'

const getGenres = async() => {
    console.log('Genres will be fetched here')
}

const getProducts = async() => {

    const db = await connectDB()

    try {
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