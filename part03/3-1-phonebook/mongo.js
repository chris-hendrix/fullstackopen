const dotenv = require('dotenv').config();
const mongoose = require('mongoose');

// parse arguments
const name = process.argv.length > 2 ? process.argv[2] : null;
const number = process.argv.length > 3 ? process.argv[3] : null;

// connect to database
const url = process.env.MONGO_URI;
mongoose.connect(url);

// define schema
const personSchema = new mongoose.Schema({
  name: String,
  number: String,
  date: Date,
});

const Person = mongoose.model('Person', personSchema);

if (name && number) {
  const person = new Person({
    name: name,
    number: number,
    date: new Date(),
  });
  person.save().then((result) => {
    console.log(result);
    console.log('person saved!');
    mongoose.connection.close();
  });
} else {
  Person.find({}).then((result) => {
    result.forEach((person) => {
      console.log(person);
    });
    mongoose.connection.close();
  });
}
