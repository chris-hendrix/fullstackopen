const router = require('express').Router()
const { tokenExtractor } = require('../util/middleware')

const { ReadingList, User } = require('../models')

router.post('/', async (req, res) => {
  try {
    const readingList = await ReadingList.create({ ...req.body, read: false })
    res.json(readingList)
  } catch (error) {
    return res.status(400).json({ error })
  }
})

router.put('/:id', [tokenExtractor], async (req, res) => {
  const user = await User.findByPk(req.decodedToken.id)
  if (!user) return res.status(404).end()

  const readingList = await ReadingList.findByPk(req.params.id)
  if (readingList.userId !== user.id) return res.status(404).end()

  if (req.body.read !== undefined) readingList.read = req.body.read
  await readingList.save()
  return res.json(readingList)
})

module.exports = router