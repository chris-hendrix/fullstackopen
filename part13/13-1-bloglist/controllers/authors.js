const router = require('express').Router()
const { sequelize } = require('../util/db')

const { Blog } = require('../models')

// GET grouped authors
router.get('/', async (_req, res) => {
  const authors = await Blog.findAll({
    group: 'author',
    attributes: [
      'author',
      [sequelize.fn('count', sequelize.col('id')), 'blogs'],
      [sequelize.fn('sum', sequelize.col('likes')), 'likes'],
    ],
    order: [[sequelize.col('likes'), 'DESC']]
  })

  console.log(JSON.stringify(authors, null, 2))
  res.json(authors)
})

module.exports = router