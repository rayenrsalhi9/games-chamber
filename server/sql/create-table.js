import { connectDB } from "./connect-db.js";

const createProductsTable = async() => {
    const db = await connectDB()
    db.exec(`
        create table if not exists products(
            id integer primary key autoincrement,
            title text not null,
            provider text not null,
            year integer not null,
            image text not null,
            genre text not null,
            price real not null,
            stock integer not null
        )
    `)
    await db.close()
    console.log('Products table created successfully.')
}

const createUsersTable = async() => {
    const db = await connectDB()
    db.exec(`
        create table if not exists users(
            id integer primary key autoincrement,
            name text not null,
            username text unique not null,
            email text unique not null,
            password text not null,
            created_at datetime default current_timestamp
        )
    `)
    await db.close()
    console.log('Users table created successfully.')
}

createUsersTable()
