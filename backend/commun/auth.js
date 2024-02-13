//auth.js

import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    const jwtToken = `${token}`.split(" ")[1];
    try {
      console.log({ jwtToken });

      const payload = jwt.verify(jwtToken, "privatekey");
      if (payload) {
        next();
      } else res.status(401).json();
    } catch (error) {
      res.status(401).json();
    }
  } else res.status(401).json();
};
