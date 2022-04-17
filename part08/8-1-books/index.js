const { ApolloServer, gql,
  UserInputError, AuthenticationError } = require('apollo-server')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const { saveDoc } = require('./utils/mongoHelper')

const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')

const { MONGODB_URI, JWT_SECRET } = process.env

console.log('connecting to', MONGODB_URI)

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = gql`
  type Author {
    id: ID!
    name: String!
    born: Int
    bookCount: Int!
  }
  type Book {
    id: ID!
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
  }
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  type Token {
    value: String!
  }
  type Query {
    me: User
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }
  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]
    ): Book
    editAuthor(
      name: String! 
      setBornTo: Int
    ): Author
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }
`

const resolvers = {
  Query: {
    me: (root, args, context) => context.currentUser,
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      const query = {}
      if (args.author) query.author = args.author
      if (args.genre) query.genres = args.genre
      return await Book.find(query).populate('author')
    },
    allAuthors: async () => Author.find({})
  },
  Author: {
    bookCount: async (root) => Book.find({ author: root.author.name }).count()
  },
  Mutation: {
    addBook: async (root, args, context) => {
      if (!context.currentUser) throw new AuthenticationError("not authenticated")     
      let author = await Author.findOne({ name: args.author })
      if (!author) author = await saveDoc(new Author({ name: args.author }), args)
      return await saveDoc(new Book({ ...args, author }, args))
    },
    editAuthor: async (root, args, context) => {
      if (!context.currentUser) throw new AuthenticationError("not authenticated")     
      const { name, setBornTo } = args
      const author = await Author.findOne({ name })
      if (!author) return
      author.born = setBornTo
      return await saveDoc(author, args)
    },
    createUser: async (root, args) => saveDoc(new User({ ...args }), args),
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'secret')
        throw new UserInputError("wrong credentials")
      const userForToken = { username: user.username, id: user._id, }
      return { value: jwt.sign(userForToken, JWT_SECRET) }
    },
  }
}

const context = async ({ req }) => {
  const auth = req ? req.headers.authorization : null
  if (auth && auth.toLowerCase().startsWith('bearer ')) {
    const decodedToken = jwt.verify(
      auth.substring(7), JWT_SECRET
    )
    const currentUser = await User.findById(decodedToken.id)
    return { currentUser }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
