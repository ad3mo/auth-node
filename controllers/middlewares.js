//middleware for authorization (check if isLoggedin)
const jwt = require("jsonwebtoken");
SECRET = "ademo";

const isLoggedIn = async (req, res, next) => {
  //check if author header exists
  try {
    if (req.headers.authorization) {
      //parse token from header
      const token = req.headers.authorization.split(" ")[1]; //splitting token
      if (token) {
        const payload = await jwt.verify(token, SECRET);
        if (payload) {
          //store user data in request object
          req.user = payload;
          next();
        } else {
          res.status(400).json({ error: "token verification failed" });
        }
      } else {
        res.status(400).json({ error: "malfomred auth header" });
      }
    } else {
      res.status(400).json({ error: "no authorization header" });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
};

module.exports = { isLoggedIn };
