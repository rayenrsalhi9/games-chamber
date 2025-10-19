import sqlite3 from 'sqlite3'
import {open} from 'sqlite'
import path from 'node:path'

export const connectDB = async() => {
    const db = await open({
        filename: path.join('database.db'),
        driver: sqlite3.Database
    })
    return db
}