const express = require('express')
const app = express()

const { PORT } = require('./util/config')
const { connectToDatabase } = require('./util/db')

app.use(express.json())

app.use('/api/login', require('./controllers/login'))
app.use('/api/users', require('./controllers/users'))
app.use('/api/blogs', require('./controllers/blogs'))
app.use('/api/authors', require('./controllers/authors'))
app.use('/api/readinglists', require('./controllers/readingLists'))
app.use('/api/logout', require('./controllers/logout'))

const start = async () => {
  await connectToDatabase()
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

start()