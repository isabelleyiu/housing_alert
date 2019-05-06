module.exports = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.status(403).json({
      isLogin: false,
      message: 'Access denied, please login'
    });
  }
  req.user.dataValues.isLogin = true;
  next();
}

// const checkAuth = (req, res, next) => {
//   if (!req.isAuthenticated()) {
//     return res.status(403).json({
//       isLogin: false,
//       message: 'Access denied, please login'
//     });
//   }
//   req.user.dataValues.isLogin = true;
//   return res.json(req.user.dataValues);
// }
