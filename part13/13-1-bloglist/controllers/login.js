const jwt = require('jsonwebtoken')
const router = require('express').Router()

const { SECRET } = require('../util/config')
const User = require('../models/user')
const Session = require('../models/session')

router.post('/', async (request, response) => {
  const body = request.body

  const user = await User.findOne({
    where: {
      username: body.username
    }
  })

  const passwordCorrect = body.password === 'secret'

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }

  const userForToken = {
    username: user.username,
    id: user.id,
  }

  // find or create token
  let session = await Session.findOne({ where: { userId: user.id } })
  if (!session) {
    const token = jwt.sign(userForToken, SECRET)
    session = await Session.create({ token, userId: user.id })
  }

  response
    .status(200)
    .send({ token: session.token, username: user.username, name: user.name })
})

module.exports = router