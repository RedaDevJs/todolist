export const isAdmin = (req, res, next) => {
  const user = req.user; // Assuming you attach the user to the request object during authentication

  if (!user || user.role !== "admin") {
    return res.status(403).json({ message: "Access forbidden" });
  }

  next(); // Continue to the next middleware or route handler
};
