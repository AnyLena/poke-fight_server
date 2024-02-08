export const checkUser = (req, res, next) => {
  const { id } = req.params;
  if (!id) return res.status(404).json({ message: "User not found" });
  next();
};
