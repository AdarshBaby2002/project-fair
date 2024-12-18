const users = require('../Models/userSchema')
const jwt = require('jsonwebtoken')

exports.registerAPI = async (req, res) => {
    console.log('inside the register api');
    const { username, email, password } = req.body
    const existingUser = await users.findOne({ email })
    if (existingUser) {
        res.status(402).json({ message: "Already Exist" })
    } else {
        const newUser = new users({
            username: username,
            email: email,
            password: password,
            github: "",
            linkedIn: "",
            profilepic: ""
        })
        await newUser.save()
        res.status(200).json("registered successfully...")
    }
}

exports.loginAPI = async (req, res) => {
    console.log('inside the login api');
    const { email, password } = req.body
    try {
        const exsitingUser = await users.findOne({ email, password })

        if (!exsitingUser) {

            res.status(402).json({ message: "Invalid Email or Password" })
        } else {
            const token = jwt.sign({userId:exsitingUser._id},process.env.jwtkey)
            
            res.status(200).json({CurrentUser:exsitingUser,token})

        }
    }catch(error){
        res.status(500).json(err)
    }
}
