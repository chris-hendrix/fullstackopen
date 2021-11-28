const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv').config();
const path = require('path');
const app = express();

app.use(express.json());
app.use(cors());

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

// GET info
app.get('/info', (request, response) => {
  const count = persons.length;
  const date = new Date();
  let html = `<p>Phonebook has info for ${count} people</p>`;
  html += `<p>${date.toString()}</p>`;
  response.send(html);
});

// GET persons
app.get('/api/persons', (request, response) => {
  response.json(persons);
});

// GET person
app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person) => person.id === id);

  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

// DELETE person
app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((person) => person.id !== id);

  response.status(204).end();
});

// PUT updated person
app.put('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  const index = persons.findIndex((person) => person.id == id);
  persons[index] = request.body;

  response.json(persons[index]);
});

// POST new person
app.post('/api/persons', (request, response) => {
  const body = request.body;
  // name and number missing
  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'content missing',
    });
  }
  // person exists
  if (persons.filter((person) => person.name === body.name).length > 0) {
    return response.status(400).json({
      error: 'name must be unique',
    });
  }
  const person = {
    name: body.name,
    number: body.number,
    date: new Date(),
    id: body.id || Math.floor(Math.random() * 999999),
  };

  persons = persons.concat(person);

  response.json(person);
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
