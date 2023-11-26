const Pool = require('pg').Pool
const pool = new Pool({
  user: 'sample',
  host: 'localhost',
  database: 'test',
  password: 'sample',
  port: 5432,
})

// CREATE ROUTE FUNCTION TO RETRIEVE ALL RECORDS FROM DATABASE TABLE
const getemployee = (request, response) => {
  pool.query('SELECT * FROM employee ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

// CREATE ROUTE FUNCTION TO RETRIEVE A SINGLE RECORD FROM THE DATABASE
const getEmployeeById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM employee WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

// CREATE ROUTE FUNCTION TO ADD NEW RECORD INTO THE DATABASE
const createEmployee = (request, response) => {
  const { name, address, gender } = request.body

  pool.query('INSERT INTO employee (name, address, gender) VALUES ($1, $2, $3)', [name, address, gender], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send('A new employee has been added to the database')
  })
}

// CREATE ROUTE FUNCTION TO UPDATE EXISTING DATABASE RECORDS

const updateEmployee = (request, response) => {
  const id = parseInt(request.params.id)
  const { name, address, gender } = request.body

  pool.query(
    'UPDATE employee SET name = $1, address = $2, gender = $3 WHERE id = $4',
    [name, address, gender, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send('Employee has been updated in the database')
    }
  )
}

// CREATE ROUTE FUNCTION TO DELETE A RECORD FROM THE DATABASE TABLE

const deleteEmployee = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM employee WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`Employee deleted with ID: ${id}`)
  })
}

module.exports = {
  getemployee,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
}
