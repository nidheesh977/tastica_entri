
export const checkUserRole = (...roles) => {

  return (req, res, next) => {
    if (!req.user.role) {
      return res.status(401).json({ success: false, message: "Unauthorized role" });
    }

    let userRole = req.user.role;

    if (!roles.includes(userRole)) {
      return res.status(403).json({ success: false, message: "Forbidden" });
    }

    next();
  };
}      