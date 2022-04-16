const { ApolloServer, gql } = require('apollo-server')
const { v1: uuid } = require('uuid')

const bookData = require('./bookData.js')

let books = bookData.books
let authors = bookData.authors

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
    author: String!
    genres: [String!]
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
    bookCount: () => books.length,
    authorCount: () => authors.length,
    allBooks: (root, args) => {
      const { author, genre } = args
      let filtered = books
      if (author) filtered = filtered.filter(b => b.author === author)
      if (genre) filtered = filtered.filter(b => b.genres.includes(genre))
      return filtered
    },
    allAuthors: () => authors
  },
  Author: {
    bookCount: (root) => books.filter(b => b.author === root.name).length
  },
  Mutation: {
    addBook: (root, args) => {
      const book = { ...args, id: uuid() }
      const { author } = args
      if (!authors.find(a => a.name === author)) {
        authors = authors.concat({ id: uuid(), name: author })
      }
      books = books.concat(book)
      return book
    },
    editAuthor: (root, args) => {
      const { name, setBornTo } = args
      const index = authors.findIndex(a => a.name === name)
      if (index === -1) return null
      authors[index] = { ...authors[index], born: setBornTo }
      return authors[index]
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
