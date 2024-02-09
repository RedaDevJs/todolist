//auth.js

import jwt from "jsonwebtoken";
export const auth = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    const jwtToken = `${token}`.replace("Bearer", "");
    try {
      console.log({ jwtToken });

      const payload = jwt.verify(jwtToken.trim(), "privatekey");
      if (payload) {
        next();
      } else res.status(401).json();
    } catch (error) {
      res.status(401).json();
    }
  } else res.status(401).json();
};
