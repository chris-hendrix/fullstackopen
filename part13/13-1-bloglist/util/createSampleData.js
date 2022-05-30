const { Blog, User } = require('../models')

const users = [
  {
    username: 'chendrix1123@gmail.com',
    name: 'Chris',
    blogs: [
      {
        author: 'Dr Seuss',
        url: 'greeneggsblog.com',
        title: 'Green Eggs and Ham blog',
        likes: 3
      },
      {
        author: 'Meta',
        url: 'reactblog.com',
        title: 'React blog',
        likes: 2
      },
      {
        author: 'Meta',
        url: 'facebookblog.com',
        title: 'Facebook blog',
        likes: 1
      }
    ]
  },
  {
    username: 'tomado@gmail.com',
    name: 'Tom',
    blogs: [
      {
        author: 'Dr Seuss',
        url: 'cathatblog.com',
        title: 'The Cat and the Hat blog',
        likes: 5
      }
    ]
  }
]

const createSampleData = async () => {
  users.forEach(async ({ username, name, blogs }) => {
    if (await User.findOne({ where: { username, name } })) return
    const user = await User.create({ username, name })
    blogs.forEach(async blog => {
      await Blog.create({ ...blog, userId: user.id })
    })
  })
}

createSampleData()