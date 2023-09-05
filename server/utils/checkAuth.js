import jwt from "jsonwebtoken";

export const verify = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, "mySecretKey", (err, user) => {
      if (err) {
        return res.status(403).json("Token is not valid!");
      }

      req.user = user;
      next();
    });
  } else {
    res.status(401).json("You are not authenticated!");
  }
};

export let refreshTokens = [];

export const generateAccessToken = (user) => {
  return jwt.sign({ id: user.id, name: user.name }, "mySecretKey", {
    expiresIn: "1d",
  });
};
export const generateRefreshToken = (user) => {
  return jwt.sign({ id: user.id, name: user.name }, "myRefreshSecretKey");
};
