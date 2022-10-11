const jwt = require('jsonwebtoken');

module.exports = role => {
    return (req, res, next) => {
        if (req.method === "OPTIONS") next();

        try {
            const token = req.headers.autorization.split(' ')[1] // Bearer token
            if (!token) return res.status(401).json({message: 'User is not authorized'});

            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            if(decoded.role !== role) return res.status(403).json({message: 'Not access'})
            req.user = decoded; //decoded
            next();

        } catch (r) {
            res.status(401).json({message: 'User is not authorized'})
        }
    }
}