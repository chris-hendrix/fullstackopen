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
app.get('/info', (request, response, next) => {
  Person.find({})
    .then((persons) => {
      const count = persons.length;
      const date = new Date();
      let html = `<p>Phonebook has info for ${count} people</p>`;
      html += `<p>${date.toString()}</p>`;
      response.send(html);
    })
    .catch((error) => next(error));
});

// GET persons
app.get('/api/persons', (request, response, next) => {
  Person.find({})
    .then((persons) => response.json(persons))
    .catch((error) => next(error));
});

// GET person
app.get('/api/persons/:id', (request, response, next) => {
  const id = request.params.id;
  const person = Person.find({ id })
    .then((foundPerson) => response.json(foundPerson))
    .catch((error) => next(error));
});

// POST new person
app.post('/api/persons', (request, response, next) => {
  const { name, number } = request.body;

  // save person
  const person = new Person({ name, number });
  person
    .save()
    .then((savedPerson) => response.json(savedPerson))
    .catch((error) => next(error));
});

// DELETE person
app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

// PUT updated note
app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body;

  Person.findByIdAndUpdate(request.params.id, { name, number }, { new: true })
    .then((updatedNote) => {
      response.json(updatedNote);
    })
    .catch((error) => next(error));
});

// middleware: handler of requests with result to errors
const errorHandler = (error, request, response, next) => {
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  }
  next(error);
};
app.use(errorHandler); // this has to be the last loaded middleware.

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
