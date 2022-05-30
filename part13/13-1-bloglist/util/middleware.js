const jwt = require('jsonwebtoken')
const { SECRET } = require('../util/config')

const { Blog, User, Session } = require('../models');

// middleware for token extracting
const tokenExtractor = async (req, res, next) => {
  const authorization = req.get('authorization')
  if (!authorization || !authorization.toLowerCase().startsWith('bearer ')) {
    return res.status(401).json({ error: 'token missing' })
  }

  try {
    const token = authorization.substring(7)
    const session = await Session.findOne({ where: { token } })
    if (!session) {
      return res.status(401).json({ error: 'token invalid' })
    }
    req.decodedToken = jwt.verify(token, SECRET)
  } catch (_err) {
    return res.status(401).json({ error: 'token invalid' })
  }
  next()
}

module.exports = { tokenExtractor }