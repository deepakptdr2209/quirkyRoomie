
require(dotenv).config();

module.exports = {
    jwtSecret: process.env.JWT_SECRET , // Use env variable for security
    jwtExpiration: '1h', // Token expires in 1 hour (adjust as needed)
  };