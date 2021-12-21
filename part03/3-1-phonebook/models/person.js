const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

// person schema
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: 'Name required',
    unique: true,
  },
  number: {
    type: String,
    minLength: 3,
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
personSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Person', personSchema);
