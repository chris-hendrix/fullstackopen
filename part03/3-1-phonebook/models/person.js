const mongoose = require('mongoose');

// person schema
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: 'Name required',
  },
  number: {
    type: String,
    required: 'number required',
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// converts id to string and deletes v from json results
personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Person', personSchema);
