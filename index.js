const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

app.use(cors());

app.use(express.json());
app.use(morgan('combined'));
app.use(express.static('dist'));

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

app.get('/', (request, response) => {
  const content = `<h1>Welcome to the phonebook backend </h1>`;
  response.send(content);
});

app.get('/info', (reqeust, response) => {
  const content = `<div> <p>Phonebook has record for ${
    persons.length
  } people</p> <div> ${new Date()} </div> 
  </div>`;

  response.send(content);
});

app.get('/api/persons', (request, response) => {
  response.json(persons);
});

app.get('/api/persons/:id', (request, response) => {
  const id = +request.params.id;

  const person = persons.find((person) => person.id === id);
  const content = `<div> No such person with an id of ${id}
  </div>`;

  if (!person) {
    return response.send(content);
  }

  response.json(person);
});

app.delete('/api/persons/:id', (request, response) => {
  const id = +request.params.id;

  persons = persons.filter((person) => person.id !== id);

  response.status(204).end();
});

app.post('/api/persons', (request, response) => {
  const data = request.body;
  const id = Math.random() * 1.4327;
  data.id = id;

  const checkIfExists = persons.find((person) => person.name === data.name);

  if (checkIfExists) {
    return response.send({ error: 'name must be unique' });
  }

  if (!data.name || !data.number) {
    return response.status(404).end();
  }

  persons = [...persons, data];

  response.json(data);
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
