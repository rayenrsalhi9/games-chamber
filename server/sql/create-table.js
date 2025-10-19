import { connectDB } from "./connect-db.js";

const createTable = async() => {
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

createTable()