'use strict'
// require dependencies
const express = require('express')
// create an express router object
const router = express.Router()
// require book model
const Book = require('./../models/book')

// require custom error handlers
const customErrors = require('./../../lib/customError')
const handle404 = customErrors.handle404
// Index: GET /books return all the books
router.get('/books', (req, res, next) => {
 // fetch all books from mongodb
 Book.find()
 .populate('author')
 .populate('comments.commenter')
  // use mongoose toObject on each book to include virtuals
  .then(books => books.map(book => book.toObject()))
  // send response 200 with books to client
  .then(books => res.json( { books: books } ))
  // on error respond with 500 and error message
  .catch(next)
})
// Show: GET /books/100 return a book
router.get('/books/:id', (req, res, next) => {
  // get id of book from params
  const id = req.params.id
  // fetching book by its id
  Book.findById(id)
  .populate('author')
  .populate('comments.commenter')
    // handle 404 error if no book found
    .then(handle404)
    // .then(books => books.map(book=>book.toObject()))
    // respond with json of the book
    // use mongoose toObject on book to include virtuals
    .then(book => res.json( { book: book.toObject() } ))
    // on error continue to error handling middleware
    .catch(next)
})
// Create: POST /books save the book data
router.post('/books', (req, res, next) => {
  //get book data
  const book = req.body.book
  //save to mongodb
  Book.create(book)

    .then(book => res.status(201).json( { book: book } ))
    // on error respond with 500 and error message
    .catch(next)
})
// Destroy: DELETE /books/:id delete the book
router.delete('/books/:id', (req, res, next) => {
  const id = req.params.id
  Book.findById(id)
    .then(handle404)
    .then(book => book.deleteOne())
    .then(() => res.sendStatus(204))
    //
    .catch(next)
})

// Update: PATCH /books/:id delete the book
router.patch('/books/:id', (req, res, next) => {
  // get id of book from params
  const id = req.params.id
  // get book data from request
  const bookData = req.body.book
  // fetching book by its id
  Book.findById(id)
    // handle 404 error if no book found
    .then(handle404)
    // update book
    .then(book => {
      // updating book object
      // with bookData
      Object.assign(book, bookData)
      // save book to mongodb
      return book.save()
    })
    // if successful return 204
    .then(() => res.sendStatus(204))
    // on error go to next middleware
    .catch(next)
})


module.exports = router
