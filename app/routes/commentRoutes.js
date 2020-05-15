'use strict'

// instantiate mongodb and mongoose
const express = require('express')
// create an express router object
const router = express.Router()
// require movie model
const Movie = require('./../models/movie')
// require custom error handlers
const customErrors = require('./../../lib/customError')
const handle404 = customErrors.handle404

router.post('/comments', (req, res, next) => {
  const comment = req.body.comment
  const movieId = comment.movie_id

  Movie.findById(movieId)
    // .then(handle404)
    .then(movie => {
       movie.comments.push(comment)
       return movie.save()
    })
    .then((movie) => {
      res.status(201).json({movie: movie.toObject()})
    })
    // on error respond with 500 and error message
    .catch(next)
})

// Show: GET /movies/100 return a movie
router.get('/comments/:movie_id/:comment_id', (req, res, next) => {
  const movie_id = req.params.movie_id
  const comment_id = req.params.comment_id
  Movie.findById(movie_id)
  .then(handle404)
  .then(movie =>
    movie.comments.filter(comment => comment._id == comment_id))
  .then((comment) =>{
    res.json( { comment: comment.toObject() } )})
  .catch(next)
})

router.delete('/comments/:movie_id/:comment_id', (req, res, next) => {
  const movie_id = req.params.movie_id
  const comment_id = req.params.comment_id
  Movie.findById(movie_id)
    .then(handle404)
    .then(movie =>{

    // console.log(movie.comments.id(comment_id)) =>result as following
    //{ _id: 5ebcaf5e8000cc6135ceb9d6,
  //    title: '22',
//      body: '22',
  //    commenter: 5eb61e6e2e101c5ca0f2f9c0,
  //    createdAt: 2020-05-14T02:39:26.337Z,
  //    updatedAt: 2020-05-14T14:20:50.335Z }
    movie.comments.id(comment_id).remove()
    movie.save()

    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

router.patch('/comments/:movie_id/:comment_id', (req, res, next) => {
  // get id of movie from params
  const movie_id = req.params.movie_id
  const comment_id = req.params.comment_id
  // get movie data from request
  const commentData = req.body.comment
  // fetching movie by its id
  Movie.findById(movie_id)
    // handle 404 error if no movie found
    .then(handle404)
    // update movie
    .then(movie => {
      // updating movie object
      // with movieData
      const comment = movie.comments.filter(comment => comment._id == comment_id)
      Object.assign(comment[0], commentData)
      // save movie to mongodb
      return movie.save()
    })
    // if successful return 204
    .then(() => res.sendStatus(204))
    // on error go to next middleware
    .catch(next)
})

module.exports = router
