const router = require('express').Router()
const { Op } = require('sequelize')

const { tokenExtractor } = require('../util/middleware')
const { Blog, User } = require('../models')

// middleware for blog finding
const blogFinder = async (req, _res, next) => {
  req.blog = await Blog.findByPk(req.params.id)
  next()
}

// GET blogs
router.get('/', async (req, res) => {
  let where = {}

  if (req.query.search) {
    where = {
      [Op.or]: {
        title: { [Op.iLike]: `%${req.query.search}%` },
        author: { [Op.iLike]: `%${req.query.search}%` }
      }
    }
  }

  const blogs = await Blog.findAll({
    attributes: { exclude: ['userId'] },
    include: {
      model: User,
      attributes: ['name']
    },
    where,
    order: [['likes', 'DESC']]
  })
  console.log(JSON.stringify(blogs, null, 2))
  res.json(blogs)
})

// POST blog
router.post('/', tokenExtractor, async (req, res) => {
  try {
    const user = await User.findByPk(req.decodedToken.id)
    const blog = await Blog.create({ ...req.body, userId: user.id })
    return res.json(blog)
  } catch (error) {
    if (error.name = 'SequelizeValidationError') {
      return res.status(400).json({ error: error.message })
    }
    return res.status(400).json({ error })
  }
})

// GET blog by id
router.get('/:id', blogFinder, async (req, res) => {
  if (req.blog) {
    console.log(req.blog.toJSON())
    res.json(req.blog)
  } else {
    res.status(404).end()
  }
})

// DELETE blog by id
router.delete('/:id', [blogFinder, tokenExtractor], async (req, res) => {
  if (req.blog) {
    await req.blog.destroy()
    console.log(req.blog.toJSON())
    res.json(req.blog)
  } else {
    res.status(404).end()
  }
})

// PUT blog by id
router.put('/:id', blogFinder, async (req, res) => {
  if (req.blog) {
    await req.blog.update(req.body)
    await req.blog.save()
    console.log(req.blog.toJSON())
    res.json(req.blog)
  } else {
    res.status(404).end()
  }
})

// GET grouped authors
router.put('/authors', async (_req, res) => {
  const blogs = await Blog.findAll()
  console.log(JSON.stringify(blogs, null, 2))
  res.json(blogs)
})

module.exports = router