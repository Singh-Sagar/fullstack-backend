const express = require('express');
const app = express();

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.use(express.json());

app.get('/api/persons',(request, response)=>{
    response.json(persons);
})

app.get('/info', (request, response)=>{
    const currentDate = new Date();
    response.send(`
        <p>Phonebook has info for ${persons.length} people</p>
        <p>${currentDate}</p>
    `);
})

app.get(`/api/persons/:id`, (request, response)=>{
    const id = request.params.id;
    const person = persons.find(i=>i.id===id);
    if(person){
      response.json(person);
    } else{
      response.status(404).end();
    }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id;
  console.log(`Received DELETE request for id: ${id}`);
  
  if (!id) {
    console.error('No ID provided');
    return response.status(400).json({ error: 'No ID provided' });
  }

  const initialLength = persons.length;
  persons = persons.filter(person => person.id !== id);
  
  if (persons.length === initialLength) {
    console.error(`Person with id ${id} not found`);
    return response.status(404).json({ error: 'Person not found' });
  }

  console.log(`Deleted person with id: ${id}`);
  response.status(204).end();
});

app.post('/api/persons', (request, response)=>{
  const person = request.body;
  console.log(person);
  response.json(person);
})


const PORT = 3001;
app.listen(PORT, ()=> {
    console.log(`server running at {PORT}`);
})