const { ApolloServer, gql } = require('apollo-server')
const bookData = require('./bookData.js')

let books = bookData.books
let authors = bookData.authors

const typeDefs = gql`
  type Author {
    id: ID!
    name: String!
    born: Int!
  }
  type Book {
    id: ID!
    title: String!
    published: Int!
    author: Author!
    genres: [String]
  }
  type Query {
    bookCount: Int!
    authorCount: Int!
  }
`

const resolvers = {
  Query: {
    bookCount: () => books.length,
    authorCount: () => authors.length
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
