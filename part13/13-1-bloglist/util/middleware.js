const jwt = require('jsonwebtoken')
const { SECRET } = require('../util/config')

// middleware for token extracting
const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')
  if (!authorization || !authorization.toLowerCase().startsWith('bearer '))
    return res.status(401).json({ error: 'token missing' })

  try {
    const token = authorization.substring(7)
    req.decodedToken = jwt.verify(token, SECRET)
  } catch (_err) {
    return res.status(401).json({ error: 'token invalid' })
  }
  next()
}

module.exports = { tokenExtractor }