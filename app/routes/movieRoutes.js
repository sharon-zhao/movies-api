'use strict'
// require dependencies
const express = require('express')
// create an express router object
const router = express.Router()
// require movie model
const Movie = require('./../models/movie')

// require custom error handlers
const customErrors = require('./../../lib/customError')
const handle404 = customErrors.handle404
// Index: GET /movies return all the movies
router.get('/movies', (req, res, next) => {
 // fetch all movies from mongodb
 Movie.find()
 .populate('director')
 .populate('comments.commenter')
  // use mongoose toObject on each movie to include virtuals
  .then(movies => movies.map(movie => movie.toObject()))
  // send response 200 with movies to client
  .then(movies => res.json( { movies: movies } ))
  // on error respond with 500 and error message
  .catch(next)
})
// Show: GET /movies/100 return a movie
router.get('/movies/:id', (req, res, next) => {
  // get id of movie from params
  const id = req.params.id
  // fetching movie by its id
  Movie.findById(id)
  .populate('director')
  .populate('comments.commenter')
    // handle 404 error if no movie found
    .then(handle404)
    // .then(movies => movies.map(movie=>movie.toObject()))
    // respond with json of the movie
    // use mongoose toObject on movie to include virtuals
    .then(movie => res.json( { movie: movie.toObject() } ))
    // on error continue to error handling middleware
    .catch(next)
})
// Create: POST /movies save the movie data
router.post('/movies', (req, res, next) => {
  //get movie data
  const movie = req.body.movie
  //save to mongodb
  Movie.create(movie)

    .then(movie => res.status(201).json( { movie: movie } ))
    // on error respond with 500 and error message
    .catch(next)
})
// Destroy: DELETE /movies/:id delete the movie
router.delete('/movies/:id', (req, res, next) => {
  const id = req.params.id
  Movie.findById(id)
    .then(handle404)
    .then(movie => movie.deleteOne())
    .then(() => res.sendStatus(204))
    //
    .catch(next)
})

// Update: PATCH /movies/:id delete the movie
router.patch('/movies/:id', (req, res, next) => {
  // get id of movie from params
  const id = req.params.id
  // get movie data from request
  const movieData = req.body.movie
  // fetching movie by its id
  Movie.findById(id)
    // handle 404 error if no movie found
    .then(handle404)
    // update movie
    .then(movie => {
      // updating movie object
      // with movieData
      Object.assign(movie, movieData)
      // save movie to mongodb
      return movie.save()
    })
    // if successful return 204
    .then(() => res.sendStatus(204))
    // on error go to next middleware
    .catch(next)
})


module.exports = router
