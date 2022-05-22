const jwt = require('jsonwebtoken')
const router = require('express').Router()

const { SECRET } = require('../util/config')
const { Blog, User } = require('../models')

// middleware for blog finding
const blogFinder = async (req, _res, next) => {
  req.blog = await Blog.findByPk(req.params.id)
  next()
}

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

// GET blogs
router.get('/', async (req, res) => {
  const blogs = await Blog.findAll({
    attributes: { exclude: ['userId'] },
    include: {
      model: User,
      attributes: ['name']
    }
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

module.exports = router