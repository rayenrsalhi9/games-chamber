import validator from 'validator'

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

    res.json({data: {name, username, email, password}})
}