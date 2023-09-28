require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const app = express();
const cors = require('cors');
const Phone = require('./models/phonebook');

app.use(cors());

app.use(express.json());
app.use(morgan('combined'));
app.use(express.static('dist'));

const errorHandler = (error, request, response, next) => {
  console.log(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'matformatted id' });
  }

  next(error);
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

app.get('/api/persons', (request, response) => {
  Phone.find({}).then((person) => {
    response.json(person);
  });
});

app.get('/api/persons/:id', (request, response) => {
  Phone.findById({ _id: request.params.id }).then((person) => {
    response.json(person);
  });
});

app.delete('/api/persons/:id', (request, response) => {
  console.log(request.params.id);
  Phone.findByIdAndDelete(request.params.id)
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => {
      console.log(error);
    });
});

app.post('/api/persons', (request, response) => {
  const body = request.body;

  const person = new Phone({
    name: body.name,
    number: Number(body.number),
  });

  person
    .save()
    .then((result) => {
      response.json(result);
    })
    .catch((error) => console.log(error));
});

app.put('/api/persons/:id', (request, response) => {
  const id = request.params.id;
  const body = request.body;

  const person = {
    name: body.name,
    number: Number(body.number),
  };

  Phone.findByIdAndUpdate(id, person, { new: true })
    .then((updatedNote) => {
      response.json(updatedNote);
    })
    .catch((error) => next(error));
});

app.use(errorHandler);
app.use(unknownEndpoint);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
