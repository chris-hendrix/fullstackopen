const dotenv = require('dotenv').config();
const mongoose = require('mongoose');

/*
if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>');
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://fullstack:${password}@cluster0-ostce.mongodb.net/test?retryWrites=true`;
*/
const url = process.env.MONGO_URI;
mongoose.connect(url);

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

const Note = mongoose.model('Note', noteSchema);

let notes = [
  {
    content: 'HTML is easy',
    important: true,
  },
  {
    content: 'Browser can execute only Javascript',
    important: false,
  },
  {
    content: 'GET and POST are the most important methods of HTTP protocol',
    important: true,
  },
];

// just print notes if no arg given
if (process.argv.length < 3) {
  Note.find({}).then((result) => {
    result.forEach((note) => {
      console.log(note);
    });
    mongoose.connection.close();
  });
  return;
}

if (process.argv[2].toLowerCase() === 'add') {
  Note.insertMany(notes).then((result) => {
    console.log(`${result.length} notes added`);
    mongoose.connection.close();
  });
} else if (process.argv[2].toLowerCase() === 'delete') {
  Note.deleteMany({}).then((result) => {
    console.log(`${result.deletedCount} notes deleted`);
    mongoose.connection.close();
  });
}
