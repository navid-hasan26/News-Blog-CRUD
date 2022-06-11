const jwt = require("jsonwebtoken");
const User = require("../api/Models/user");


const jwt_auth = (req, res,next) => {
    const token = req.body.token || req.query.token || req.headers["x-access-token"];
    try {
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY)
        const email = decodedToken.email;
        const id = decodedToken.id;
        if (!email) {
            return res.status(401).json({message: 'No email!'});
        }
        const user = User.findOne({where: {Email: email}});
        req.id = id;
        req.Email = email;
        next();
    } catch (error) {
        return res.status(401).json({message: 'You are not authorized!',
        error: error});
    }
   
  };

  module.exports = jwt_auth;