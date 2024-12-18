const { json } = require('express');
const jwt = require('jsonwebtoken')

const jwtMiddleware = (req, res, next) => {
    console.log("jwt Middleware",req.path);

    // if (!req.path) {
    //     return res.status(400).json({ message: 'Invalid path' });
    // }

    // if (req.path.startsWith('/uploads') || req.path === '/favicon.ico') {
    //     return next();
    // }

    try {
        const token = req.headers['authorization'].slice(7)
        console.log(token);
        const jwtTokenVerification = jwt.verify(token, process.env.jwtkey)
        console.log(jwtTokenVerification)
        req.payload = jwtTokenVerification.userId
        next()

    } catch (err) {
        res.status(401).json('please login')
        console.log(err);

    }
}
module.exports = jwtMiddleware