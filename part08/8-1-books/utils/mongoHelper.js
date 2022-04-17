const mongoose = require('mongoose')
const { UserInputError } = require('apollo-server')

module.exports = {
  saveDoc: async (document, args) => {
    try {
      if (!document._id) document._id = new mongoose.Types.ObjectId()
      const savedDocument = await document.save()
      return savedDocument
    } catch (error) {
      console.log(error)
      throw new UserInputError(error.message, { invalidArgs: args })
    }
  }
}