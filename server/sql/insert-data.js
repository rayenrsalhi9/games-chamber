import {connectDB} from './connect-db.js'
import { products } from '../data.js'

const insertData = async() => {

    const db = await connectDB()

    try {
        await db.exec('BEGIN TRANSACTION')

        for (const {title, provider, year, genre, price, stock, image} of products) {
            await db.run(`
                INSERT INTO products (title, provider, year, genre, price, stock, image)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            `, [title, provider, year, genre, price, stock, image])
        }

        await db.exec('COMMIT')
    } catch(err) {
        await db.exec('ROLLBACK')
        console.error('Error inserting data:', err.message)
    } finally {
        await db.close()
        console.log('Data insertion completed')
    }

}

insertData()