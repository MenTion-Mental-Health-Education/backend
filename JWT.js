require('dotenv').config();
const { sign, verify} = require('jsonwebtoken');

const createTokens = (user) => {
    const accessToken = sign(
        {username: user.username, id: user.id},
        process.env.JWT_SECRET
    );
    return accessToken;
};

const validateToken = (req, res, next) => {
    const accessToken = req.headers["authorization"];
  
    if (!accessToken)
      return res.status(400).json({ error: "User not Authenticated!" });
  
    try {
      const token = accessToken.split(" ")[1];
      const validToken = verify(token, process.env.JWT_SECRET);
      if (validToken) {
        req.authenticated = true;
        return next();
      }
    } catch (err) {
      return res.status(400).json({ error: err });
    }
  };

module.exports = {createTokens, validateToken};