let jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    
    if ( authorization === undefined || authorization === '' ) {
      res.status(400).json({ message: "authorization is not defined" });
      return;
    }
    
    const token = authorization.split(' ')[1];
    if ( !token || token == 'null' ) {
      res.status(400).json({ message: "token is not defined" });
      return;
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    
    if ( !decoded?.id ) {
      res.status(400).json({ message: "token is not valid" });
      return;
    }

    req.uid = decoded.id;

    next();
  } catch (error) {
    
  }
}

module.exports = protect;