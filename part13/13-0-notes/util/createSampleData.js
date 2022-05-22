const { Note, User } = require('../models')

const users = [
  {
    username: 'chendrix1123@gmail.com',
    name: 'Chris',
    notes: [
      {
        content: 'Relational databases rule the world',
        important: true,
        date: null
      }
    ]
  },
  {
    username: 'tomado@gmail.com',
    name: 'Tom',
    notes: [
      {
        content: 'MongoDB is webscale',
        important: false,
        date: null
      }
    ]
  }
]

const createSampleData = async () => {
  users.forEach(async ({ username, name, notes }) => {
    if (await User.findOne({ where: { username, name } })) return
    const user = await User.create({ username, name })
    notes.forEach(async note => {
      await Note.create({ ...note, userId: user.id })
    })
  })
}

createSampleData()