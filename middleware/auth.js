const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = function(req, res, next) {
  const authHeader = req.headers.authorization;
  if(authHeader) {
    const token = authHeader.split(' ')[1];

    if(!token) {
      return res.status(401).json({ msg: 'No Token, Authorization Denied' });
    }

    // Verify Token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if(err) {
        return res.status(401).json({ msg: 'Token not valid' });
      }

      req.user = decoded.user;
      next();
    })
  } else {
    return res.status(401).json({ msg: 'No Token, Authorization Denied' });
  }
}