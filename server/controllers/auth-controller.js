import validator from 'validator'
import bcrypt from 'bcryptjs'
import {connectDB} from '../sql/connect-db.js'

export const loginUser = async(req, res) => {
    let {email, password} = req.body

    if (!email || !password) {
        return res.status(400)
            .json({error: 'All fields are required'})
    }

    email = email.trim()
    password = password.trim()

    const isEmailValid = validator.isEmail(email)
    if (!isEmailValid) {
        return res.status(400)
            .json({error: 'Invalid email format'})
    }

    try {
        const db = await connectDB()

        const user = await db.get(`
            select * from users
            where email = ?
        `, [email])

        if (!user) {
            return res.status(400)
                .json({error: 'Invalid credentials, please try again'})
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
            return res.status(400)
                .json({error: 'Invalid credentials, please try again'})
        }

        req.session.userId = user.id

        res.status(200)
            .json({message: 'User logged in successfully'})

    } catch(err) {
        console.log(err)
        return res.status(500)
            .json({error: 'Internal server error'})
    }

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
        
        if (doesUserExist) {
            return res.status(400)
                .json({error: 'Email or username already exists'})
        }

        const hashed = await bcrypt.hash(password, 10)
        
        const result = await db.run(`
            insert into users (name, username, email, password)
            values (?, ?, ?, ?)
        `, [name, username, email, hashed])

        req.session.userId = result.lastID

        res.status(201)
            .json({message: 'User registered successfully'})

    } catch(err) {
        console.log(err)
        return res.status(500)
            .json({error: 'Internal server error'})
    }
}

export const logoutUser = async(req, res) => {
    try {
        req.session.destroy(() => res.json({success: true, message: 'User logged out successfully'}))
    } catch(err) {
        console.log(err)
        return res.status(500)
            .json({error: 'Internal server error'})
    }
}