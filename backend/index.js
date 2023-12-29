import express, { json, response } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import 'dotenv/config';
import { Person } from './models/Person.js';
const app = express();
const PORT = process.env.PORT || 3000;

// let persons = [
//   {
//     id: 1,
//     name: "Arto Hellas",
//     number: "040-123456",
//   },
//   {
//     id: 2,
//     name: "Ada Lovelace",
//     number: "39-44-5323523",
//   },
//   {
//     id: 3,
//     name: "Dan Abramov",
//     number: "12-43-234345",
//   },
//   {
//     id: 4,
//     name: "Mary Poppendieck",
//     number: "39-23-6423122",
//   },
//   {
//     id: 5,
//     name: "Emily Davis",
//     number: "222-333-4444",
//   },
//   {
//     id: 6,
//     name: "Chris Anderson",
//     number: "555-777-8888",
//   },
//   {
//     id: 7,
//     name: "Linda Brown",
//     number: "111-222-3333",
//   },
//   {
//     id: 8,
//     name: "Robert Miller",
//     number: "777-888-9999",
//   },
// ]


morgan.token('body', function(req, res) {
  return JSON.stringify(req.body);
});

app.use(cors())
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.get('/api/persons', (req, res) => {
  Person
  .find({})
  .then(persons=> {
    res.status(200).json(persons);
  })
})

app.get('/info', (req, res) => {
  const total = persons.length;

  res.send(`
    <p>Phonebook has info for ${total} people</p>
    ${new Date()}
  `)
})

app.get('/api/persons/:id', (req, res, next) => {
  const { id } = req.params;
  
  Person.findById(id)
    .then(person => {
      if(person) {
        res.status(200).json(person)
      } else {
        res.status(404).end()
      }
    })
    .catch(error => next(error))
  
})

app.delete('/api/persons/:id', (req, res, next) => {
  const { id } = req.params;
  Person.findByIdAndDelete(id)
    .then(result => {
      res.status(204).end();
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
  const { id } = req.params;
  const { name, number } = req.body;
  const person = {
    name,
    number
  }
  Person.findByIdAndUpdate(id, person, { new: true })
    .then(updatedPerson => {
      res.json(updatedPerson)
    })
    .catch(error => next(error))
})

const isUnique = (name) => {
  return !persons.some(person => person.name.toLowerCase() === name.toLowerCase())
}

app.post('/api/persons', (req, res) => {
  const body = req.body;

  if(!body.name) {
    return res.status(400).json({
      error: 'name is required'
    })
  }
  if(!body.number) {
    return res.status(400).json({
      error: 'number is required'
    })
  }

  // if(!isUnique(body.name)) {
  //   return res.status(400).json({
  //     error: 'name must be unique'
  //   })
  // }

  // const id = Math.floor(Math.random()*100000)
  const person = new Person ({
    name: body.name,
    number: body.number
  })
  
  person.save().then(savedPerson => {
    res.json(savedPerson);
  })
})

const errorHandler = (error, req, res, next) => {
  console.log('middleware');
  console.error(error.message)

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  } 

  next(error)
}

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})


process.on('SIGINT', () => {
  console.log('Received SIGINT. Closing MongoDB connection and exiting...');
  Person.connection.close(() => {
    console.log('MongoDB connection closed.');
    server.close(() => {
      console.log('Express server closed.');
      process.exit(0);
    });
  });
});