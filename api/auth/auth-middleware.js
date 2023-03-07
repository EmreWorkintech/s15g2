// AUTHENTICATION
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../../config/index')

const restricted = (req, res, next) => {
  const token = req.headers.authorization;
  // token olmayabilir
  if(token){
    
    jwt.verify(token, JWT_SECRET, (err,decodedJWT)=> {

      if(err) {
        //token var, geçersiz
        next({status:401, message: "geçersiz token!..."});
      } else {
        // token var, geçerli
        req.userInfo = decodedJWT;
        next();
      }

    })
  } else {
    next({status: 401, message: "Hop. token nerede?"})
  }

  
}

// AUTHORIZATION
const checkRole = role => (req, res, next) => {  //currying

  if(req.userInfo && req.userInfo.role === role) {
    next()
  } else {
    next({status:403, message: "Yetkiniz yok!.."})
  }
  
}

module.exports = {
  restricted,
  checkRole,
}
