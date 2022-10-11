const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    if (req.method === "OPTIONS") next();

    try {
        const token = req.headers.autorization.split(' ')[1] // Bearer token
        if (!token) return res.status(401).json({message: 'User is not authorized'});

        req.user = jwt.verify(token, process.env.SECRET_KEY); // decoded
        next();

    } catch (r) {
        res.status(401).json({message: 'User is not authorized'})
    }
}