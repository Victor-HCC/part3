import express from 'express';
const app = express();
const PORT = 3001;

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  }
]

app.get('/api/persons', (req, res) => {
  res.status(200).json(persons);
})

app.get('/info', (req, res) => {
  const total = persons.length;

  res.send(`
    <p>Phonebook has info for ${total} people</p>
    ${new Date()}
  `)
})

app.get('/api/persons/:id', (req, res) => {
  const { id } = req.params;
  const person = persons.find(person => person.id === Number(id))
  
  if(person) res.status(200).json(person)
  else res.status(404).end()
})

app.delete('/api/persons/:id', (req, res) => {
  const { id } = req.params;
  persons = persons.filter(person => person.id !== Number(id));
  res.status(204).end();
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})