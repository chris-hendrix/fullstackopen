// const { ApolloServer, gql } = require('apollo-server')
const bookData = require('./bookData.js')

let books = bookData.books
let authors = bookData.authors

const typeDefs = gql`
  type Query {
  }
`

const resolvers = {
  Query: {
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
  console.log(bookData)
})
