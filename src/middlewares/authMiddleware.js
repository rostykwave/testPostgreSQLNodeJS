const jwt = require("jsonwebtoken");
const { NotAuthorizedError } = require("../helpers/errors");

const authMiddleware = (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      next(
        new NotAuthorizedError(
          "Please, provide a token in request authorization headers"
        )
      );
    }

    const [_, token] = authorization.split(" ");

    if (!token) {
      next(new NotAuthorizedError("Please, provide a token"));
    }

    const user = jwt.decode(token, process.env.JWT_SECRET);

    req.token = token;
    req.user = user;

    next();
  } catch (error) {
    next(new NotAuthorizedError("Invalid token"));
  }
};

module.exports = {
  authMiddleware,
};
