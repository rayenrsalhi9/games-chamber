import validator from 'validator'
import {connectDB} from '../sql/connect-db.js'

export const loginUser = () => {
    console.log('user sign in process will appear here')
}

export const registerUser = async(req, res) => {

    let {name, username, email, password} = req.body

    if (!name || !username || !email || !password) {
        return res.status(400)
            .json({error: 'All fields are required'})
    }

    name = name.trim()
    username = username.trim()
    email = email.trim()
    password = password.trim()

    const isEmailValid = validator.isEmail(email)
    if (!isEmailValid) {
        return res.status(400)
            .json({error: 'Invalid email format'})
    }

    const usernameRegex = /^[a-zA-Z0-9_-]{1,20}$/
    const isUsernameValid = usernameRegex.test(username)
    if(!isUsernameValid) {
        return res.status(400)
            .json({error: 'Username must be 1-20 characters, using letters, numbers, _ or -.'}) 
    }

    try {
        const db = await connectDB()
        const doesUserExist = await db.get(`
            select * from users
            where email = ?
            or username = ?
        `, [email, username])
        console.log(doesUserExist)
        if (doesUserExist) {
            return res.status(400)
                .json({error: 'Email or username already exists'})
        }
        await db.run(`
            insert into users (name, username, email, password)
            values (?, ?, ?, ?)
        `, [name, username, email, password])

        console.log('user registered successfully')
    } catch(err) {
        console.log(err)
        return res.status(500)
            .json({error: 'Internal server error'})
    }

    res.json({data: {name, username, email, password}})
}