const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv').config();
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const Person = require('./models/person');

app.use(express.json());
app.use(cors());

/*
// morgan middleware
morgan.token('id', function getId(req) {
  return req.id;
});

morgan.token('post', (request) => {
  if (request.method === 'POST') {
    return JSON.stringify(request.body);
  }
});
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post'));


let persons = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: 4,
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
];
*/

// connect to mongoose
mongoose
  .connect(process.env.MONGODB_URI)
  .then((result) => {
    console.log('connected to MongoDB');
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message);
  });

// GET info
app.get('/info', (request, response) => {
  Person.find({})
    .then((persons) => {
      const count = persons.length;
      const date = new Date();
      let html = `<p>Phonebook has info for ${count} people</p>`;
      html += `<p>${date.toString()}</p>`;
      response.send(html);
    })
    .catch((error) => response.json({ error }));
});

// GET persons
app.get('/api/persons', (request, response) => {
  Person.find({})
    .then((persons) => response.json(persons))
    .catch((error) => response.json(error));
});

// GET person
app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id;
  const person = Person.find({ id })
    .then((foundPerson) => response.json(foundPerson))
    .catch((error) => response.status(404).json({ error }));
});

// POST new person
app.post('/api/persons', (request, response) => {
  const { name, number } = request.body;

  // person exists
  const persons = Person.find({ name, number })
    .then((persons) => {
      if (persons.length > 0) {
        return response.status(400).json({
          error: 'name must be unique',
        });
      }
    })
    .catch((error) => response.json({ error }));

  // save person
  const person = new Person({ name, number });
  person
    .save()
    .then((savedPerson) => response.json(savedPerson))
    .catch((error) => response.json({ error }));
});

// DELETE person
app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id;
  Person.deleteMany({ _id: id })
    .then((doc) => response.json(doc))
    .catch((error) => response.status(204).json({ error }));
});

// PUT updated person
app.put('/api/persons/:id', (request, response) => {
  const id = request.params.id;
  const { name, number } = request.body;
  Person.updateOne({ id }, { $set: { name, number } })
    .then((doc) => response.json(doc))
    .catch((error) => response.json({ error }));
});

// serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
