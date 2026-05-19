const jwt = require("jsonwebtoken");

function verifyJwt(req, res, next) {
  try {
    if (!req.headers.authorization) {
      return res.status(401).json({
        success: false,
        message: "token is needed",
      });
    }
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "permission needed with token",
    });
  }
}

module.exports = verifyJwt;
