const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/jwtConfig');
const authMiddleware = (req, res, next) => {
    const token =  req.header('Authorization')?.split(" ")[1];
    
   
    if(!token){
        console.log('No token');
        return res.status(401).json({
            message : "Access denied"
        });
    }
    try {
        const decoded = jwt.verify(token, jwtSecret);
        
        req.user = decoded;
        
        next();
    } catch (error) {
        return res.status(401).json({
            message: "Invalid token"
        });
    }
}

module.exports = authMiddleware;