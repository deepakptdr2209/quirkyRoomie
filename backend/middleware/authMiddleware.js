const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/jwtConfig');
const authMiddleware = (req, res, next) => {
    const token =  req.header('Authorization')?.replace('Bearer ', '');
    if(!token){
        return res.status(401),json({
            message : "Access denied"
        });
    }
    try {
        const decoded = jwt.verify(token, jwtSecret);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        return res.status(401).json({
            message: "Invalid token"
        });
    }
}

module.exports = authMiddleware;