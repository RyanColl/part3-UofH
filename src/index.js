  const express = require('express')
  const app = express()
  // const morgan = require('morgan')
  const cors = require('cors')

  app.use(cors())
  app.use(express.json())
  let notes = [
    {
      id: 1,
      content: "HTML is easy",
      date: "2019-05-30T17:30:31.098Z",
      important: true
    },
    {
      id: 2,
      content: "Browser can execute only Javascript",
      date: "2019-05-30T18:39:34.091Z",
      important: false
    },
    {
      id: 3,
      content: "GET and POST are the most important methods of HTTP protocol",
      date: "2019-05-30T19:20:14.298Z",
      important: true
    }
  ]
  
  app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
  })
  
  app.get('/api/notes', (request, response) => {
    response.json(notes)
  })

  app.get('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    const note = notes.find(note => note.id === id)
    if (note) {
        response.json(note)
      } else {
        response.status(404).end()
      }
  })
  
  const generateId = () => {
    const maxId = notes.length > 0
      ? Math.max(...notes.map(n => n.id))
      : 0
    return maxId + 1
  }
  
  app.post('/api/notes', (request, response) => {
    const body = request.body
  
    if (!body.content) {
      return response.status(400).json({ 
        error: 'content missing' 
      })
    }
  
    const note = {
      content: body.content,
      important: body.important || false,
      date: new Date(),
      id: generateId(),
    }
  
    notes = notes.concat(note)
  
    response.json(note)
  })

  app.delete('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    notes = notes.filter(note => note.id !== id)
  
    response.status(204).end()
  })
  
  const PORT = process.env.PORT || 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })

// const requestLogger = (request, response, next) => {
//   console.log('Method:', request.method)
//   console.log('Path:  ', request.path)
//   console.log('Body:  ', request.body)
//   console.log('---')
//   next()
// }

// app.use(requestLogger)

// app.use(morgan('tiny', {skip: function (req, res) { return res.statusCode < 400}}))





// let persons = 
//     [
//         { 
//           "id": 1,
//           "name": "Arto Hellas", 
//           "number": "040-123456"
//         },
//         { 
//           "id": 2,
//           "name": "Ada Lovelace", 
//           "number": "39-44-5323523"
//         },
//         { 
//           "id": 3,
//           "name": "Dan Abramov", 
//           "number": "12-43-234345"
//         },
//         { 
//           "id": 4,
//           "name": "Mary Poppendieck", 
//           "number": "39-23-6423122"
//         }
//     ]
//     const html = `
//       <h1>hello, world!</h1>
//       <form action='api/persons' method='post'> 

      
//       </form>
//     `
//     app.get('/', (req, res) => {
//       res.send('')
//     })
//     app.get('/api/persons', (request, response) => {
//             response.json(persons)
//           })
//     app.get('/info', (req, res) => {
//         let t = 0
//         persons.forEach((person, i) => {
//             t = i
            
//         })
//         res.send(`
//             <h5>
//                 Phonebook has information for ${t+1} people
//             </h5>
//             <h5>${new Date()}</h5>
//         `)
//     })
//     app.get('/api/persons/:id', (request, response) => {
//         const id = Number(request.params.id)
//         const person = persons.find(person => person.id === id)
//         if (person) {
//             response.json(person)
//           } else {
//             response.status(404).end()
//           }
//       })
//       app.delete('/api/persons/:id', (req, res) => {
          
//       })
//       app.post('/api/persons', (request, response) => {
//         const body = request.body
      
//         if (!body.content) {
//           return response.status(400).json({ 
//             error: 'content missing' 
//           })
//         }
      
//         const person = {
//           content: body.content,
//           important: body.important || false,
//           date: new Date(),
//           id: generateId(),
//         }
      
//         persons = persons.concat(person)
      
//         response.json(person)
//       })
      
//           const PORT = 3001
//           app.listen(PORT, () => {
//             console.log(`Server running on port ${PORT}`)
//           })
