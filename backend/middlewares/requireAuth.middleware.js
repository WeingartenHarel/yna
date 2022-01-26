const logger = require('../services/logger.service')

async function requireAuth(req, res, next) {
  if (!req.session || !req.session.user) {
    res.status(401).end('Unauthorized!');
    return;
  }
  next();
}

async function requireAdmin(req, res, next) {
  const user = req.session.user;
  console.log('requireAdmin user',user)
  if (!user.isAdmin) {
    res.status(403).end('Unauthorized Enough..');
    return;
  }
  next();
}

async function requireUser(req, res, next) {
  const user = req.session.user;
  console.log('requireUser user',user)
  if (!user.isAdmin) {
    next();
  }

}


// module.exports = requireAuth;

module.exports = {
  requireAuth,
  requireAdmin,
  requireUser
}
