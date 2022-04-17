const mongoose = require('mongoose')

module.exports = {
  saveDoc: async (document, args) => {
    try {
      if (!document._id) document._id = new mongoose.Types.ObjectId()
      const savedDocument = await document.save()
      return savedDocument
    } catch (error) {
      throw new UserInputError(error.message, { invalidArgs: args })
    }
  }
}