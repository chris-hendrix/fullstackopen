const jwt = require('jsonwebtoken')
const router = require('express').Router()

const { tokenExtractor } = require('../util/middleware')
const Session = require('../models/session')

router.delete('/', [tokenExtractor], async (req, res) => {
  const userId = req.decodedToken.id
  const session = await Session.findOne({ where: { userId } })
  if (!session) {
    return res.status(400).json({ error: 'session not found' })
  }
  await session.destroy()

  res
    .status(200)
    .send(session)
})

module.exports = router