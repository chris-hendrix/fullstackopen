require('dotenv').config()

module.exports = {
  DB_URI: process.env.DB_URI,
  PORT: process.env.PORT || 3001,
  SECRET: process.env.SECRET
}