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

const createCartItemsTable = async() => {
    const db = await connectDB()
    db.exec(`
        create table if not exists cart_items(
            id integer primary key autoincrement,
            user_id integer not null,
            product_id integer not null,
            quantity integer not null default 1,
            foreign key (user_id) references users(id),
            foreign key (product_id) references products(id)
        )
    `)
    await db.close()
    console.log('Cart items table created successfully.')
}