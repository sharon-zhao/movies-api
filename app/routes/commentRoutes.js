'use strict'

// instantiate mongodb and mongoose
const express = require('express')
// create an express router object
const router = express.Router()
// require book model
const Book = require('./../models/book')
// require custom error handlers
const customErrors = require('./../../lib/customError')
const handle404 = customErrors.handle404

router.post('/comments', (req, res, next) => {
  const comment = req.body.comment
  const bookId = comment.book_id

  Book.findById(bookId)
    // .then(handle404)
    .then(book => {
       book.comments.push(comment)
       return book.save()
    })
    .then((book) => {
      res.status(201).json({book: book.toObject()})
    })
    // on error respond with 500 and error message
    .catch(next)
})

// Show: GET /books/100 return a book
router.get('/comments/:book_id/:comment_id', (req, res, next) => {
  const book_id = req.params.book_id
  const comment_id = req.params.comment_id
  Book.findById(book_id)
  .then(handle404)
  .then(book =>
    book.comments.filter(comment => comment._id == comment_id))
  .then((comment) =>{
    res.json( { comment: comment.toObject() } )})
  .catch(next)
})

router.delete('/comments/:book_id/:comment_id', (req, res, next) => {
  const book_id = req.params.book_id
  const comment_id = req.params.comment_id
  Book.findById(book_id)
    .then(handle404)
    .then(book =>{

    // console.log(book.comments.id(comment_id)) =>result as following
    //{ _id: 5ebcaf5e8000cc6135ceb9d6,
  //    title: '22',
//      body: '22',
  //    commenter: 5eb61e6e2e101c5ca0f2f9c0,
  //    createdAt: 2020-05-14T02:39:26.337Z,
  //    updatedAt: 2020-05-14T14:20:50.335Z }
    book.comments.id(comment_id).remove()
    book.save()

    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

router.patch('/comments/:book_id/:comment_id', (req, res, next) => {
  // get id of book from params
  const book_id = req.params.book_id
  const comment_id = req.params.comment_id
  // get book data from request
  const commentData = req.body.comment
  // fetching book by its id
  Book.findById(book_id)
    // handle 404 error if no book found
    .then(handle404)
    // update book
    .then(book => {
      // updating book object
      // with bookData
      const comment = book.comments.filter(comment => comment._id == comment_id)
      Object.assign(comment[0], commentData)
      // save book to mongodb
      return book.save()
    })
    // if successful return 204
    .then(() => res.sendStatus(204))
    // on error go to next middleware
    .catch(next)
})

module.exports = router
