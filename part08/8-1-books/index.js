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
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
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
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
