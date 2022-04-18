const { ApolloServer } = require('apollo-server-express')
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core')
const { makeExecutableSchema } = require('@graphql-tools/schema')
const { execute, subscribe } = require('graphql')
const { SubscriptionServer } = require('subscriptions-transport-ws')

require('dotenv').config()
const express = require('express')
const http = require('http')
const mongoose = require('mongoose')


const typeDefs = require('./schema')
const { resolvers, context } = require('./serverUtils')

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

const start = async () => {
  const app = express()
  const httpServer = http.createServer(app)
  const schema = makeExecutableSchema({ typeDefs, resolvers })
  const subscriptionServer = SubscriptionServer.create(
    { schema, execute, subscribe, },
    { server: httpServer, path: '', }
  )
  const plugins = [
    ApolloServerPluginDrainHttpServer({ httpServer }), {
      async serverWillStart () {
        return { async drainServer () { subscriptionServer.close() }, }
      },
    },
  ]

  const server = new ApolloServer({ schema, context, plugins })
  await server.start()
  server.applyMiddleware({ app, path: '/' })

  const PORT = 4000
  httpServer.listen(PORT, () =>
    console.log(`Server is now running on http://localhost:${PORT}`)
  )
}

start()
