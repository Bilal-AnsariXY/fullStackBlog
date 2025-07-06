exports.isAdmin = (req, res, next) => {
  try {
    if (!req.user || req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied: Admins only.',
      });
    }
    console.log('hello bilal handsome');

    next();
  } catch (err) {
    console.error("Admin check failed:", err);
    return res.status(500).json({
      success: false,
      message: 'Server error during admin check',
    });
  }
};
