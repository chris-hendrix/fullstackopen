const { ApolloServer, gql } = require('apollo-server')
const bookData = require('./bookData.js')

let books = bookData.books
let authors = bookData.authors

const typeDefs = gql`
  type Author {
    id: ID!
    name: String!
    born: Int!
    bookCount: Int!
  }
  type Book {
    id: ID!
    title: String!
    published: Int!
    author: String!
    genres: [String]
  }
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String): [Book!]!
    allAuthors: [Author!]!
  }
`

const resolvers = {
  Query: {
    bookCount: () => books.length,
    authorCount: () => authors.length,
    allBooks: (root, args) => {
      const { author } = args
      if (author) return books.filter(b => b.author === author)
      return books
    },
    allAuthors: () => authors
  },
  Author: {
    bookCount: (root) => books.filter(b => b.author === root.name).length
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
