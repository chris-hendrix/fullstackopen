const { ApolloServer, gql } = require('apollo-server')
require('dotenv').config()
const mongoose = require('mongoose')

const { saveDoc } = require('./utils/mongoHelper')

const Book = require('./models/book')
const Author = require('./models/author')

const { MONGODB_URI } = process.env

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
  type Query {
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
  }
`

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      const query = {}
      if (args.author) query.author = args.author
      if (args.genre) query.genres = args.genre
      return await Book.find(query)
    },
    allAuthors: async () => Author.find({})
  },
  Author: {
    bookCount: async (root) => Book.find({ author: root.author.name }).count()
  },
  Mutation: {
    addBook: async (root, args) => {
      let author = await Author.findOne({ name: args.author })
      if (!author) author = await saveDoc(new Author({ name: args.author }), args)
      return await saveDoc(new Book({ ...args, author }, args))
    },
    editAuthor: async (root, args) => {
      const { name, setBornTo } = args
      const author = await Author.findOne({ name })
      if (!author) return
      author.born = setBornTo
      return await saveDoc(author, args)
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
