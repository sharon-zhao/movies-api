'use strict'
// require dependencies
const express = require('express')
// create an express router object
const router = express.Router()
// require book model
const Person = require('./../models/person')
// require custom error handlers
const customErrors = require('./../../lib/customError')
const handle404 = customErrors.handle404
// Index: GET /books return all the books
router.get('/persons', (req, res, next) => {
 // fetch all books from mongodb
 Person.find()
  // use mongoose toObject on each book to include virtuals
  .then(people => people.map(people => people.toObject()))
  // send response 200 with books to client
  .then(peoples => res.json( { person: peoples } ))
  // on error respond with 500 and error message
  .catch(next)
})
// Show: GET /books/100 return a book
router.get('/persons/:id', (req, res, next) => {
  // get id of book from params
  const id = req.params.id
  // fetching book by its id
  Person.findById(id)
    // handle 404 error if no book found
    .then(handle404)
    // .then(books => books.map(book=>book.toObject()))
    // respond with json of the book
    // use mongoose toObject on book to include virtuals
    .then(people => res.json( { person: people.toObject() } ))
    // on error continue to error handling middleware
    .catch(next)
})
// Create: POST /books save the book data
router.post('/persons', (req, res, next) => {
  //get book data
  const person = req.body.person
  //save to mongodb
  Person.create(person)
    .then(person => res.status(201).json( { person: person } ))
    // on error respond with 500 and error message
    .catch(next)
})
// Destroy: DELETE /books/:id delete the book
router.delete('/persons/:id', (req, res, next) => {
  const id = req.params.id
  Person.findById(id)
    .then(handle404)
    .then(people => people.deleteOne())
    .then(() => res.sendStatus(204))
    //
    .catch(next)
})

// Update: PATCH /books/:id delete the book
router.patch('/persons/:id', (req, res, next) => {
  // get id of book from params
  const id = req.params.id
  // get book data from request
  const personData = req.body.person
  // fetching book by its id
  Person.findById(id)
    // handle 404 error if no book found
    .then(handle404)
    // update book
    .then(people => {
      // updating book object
      // with bookData
      Object.assign(people, personData)
      // save book to mongodb
      return people.save()
    })
    // if successful return 204
    .then(() => res.sendStatus(204))
    // on error go to next middleware
    .catch(next)
})

module.exports = router
