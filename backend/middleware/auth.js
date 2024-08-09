const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try{ 
    const token = req.header("Authorization")?.split(" ")[1];

    if (!token) {
      res.status(401).json({error: "Token is required"});
    }
    const decoded = jwt.verify(token, process.env.SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: "Request is not authorized", error: error.message });
  }
};

module.exports = auth;
