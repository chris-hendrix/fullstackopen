const dotenv = require('dotenv').config();
const mongoose = require('mongoose');

// note schema
const noteSchema = new mongoose.Schema({
  content: {
    type: String,
    required: 'note cannot be blank',
  },
  date: {
    type: Date,
    default: Date.now,
  },
  important: {
    type: Boolean,
    default: true,
  },
});

// converts id to string and deletes v from json results
noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Note', noteSchema);
