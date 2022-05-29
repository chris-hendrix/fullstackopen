const router = require('express').Router()

const { Blog, ReadingList } = require('../models')

router.post('/', async (req, res) => {
  try {
    const readingList = await ReadingList.create({ ...req.body, read: false })
    res.json(readingList)
  } catch (error) {
    return res.status(400).json({ error })
  }
})

module.exports = router