const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./queries')
const port = 3000

app.use(bodyParser.json())

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

// GET Request to root URL (/)
app.get('/', (request, response) => {
  response.json({Welcome: 'How to create API with Node.js,EXPRESS and PostgreSQL' })
})

// Endpoints

app.get('/employee', db.getemployee)
app.get('/employee/:id', db.getEmployeeById)
app.post('/employee', db.createEmployee)
app.put('/employee/:id', db.updateEmployee)
app.delete('/employee/:id', db.deleteEmployee)


app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})
