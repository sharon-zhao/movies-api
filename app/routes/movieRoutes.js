'use strict'
// require dependencies
const express = require('express')
// create an express router object
const router = express.Router()
// require movie model
const Movie = require('./../models/movie')
const passport = require('passport')
// require custom error handlers
const customErrors = require('./../../lib/customError')
const customError = require('./../../lib/customErrors')
const handle404 = customErrors.handle404
const removeBlanks = require('./../../lib/remove_blank_fields')
const requireToken = passport.authenticate('bearer', { session: false })
const requireOwnership = customError.requireOwnership
// Index: GET /movies return all the movies
router.get('/movies', requireToken, (req, res, next) => {
 // fetch all movies from mongodb
 Movie.find()
  // use mongoose toObject on each movie to include virtuals
  .then(movies => movies.map(movie => movie.toObject()))
  // send response 200 with movies to client
  .then(movies => res.json( { movies: movies } ))
  // on error respond with 500 and error message
  .catch(next)
})
// Show: GET /movies/100 return a movie
router.get('/movies/:id', requireToken, (req, res, next) => {
  // get id of movie from params
  const id = req.params.id
  // fetching movie by its id
  Movie.findById(id)
    // handle 404 error if no movie found
    .then(handle404)
    // .then(movies => console.log(movies))

    .then(movie => res.json( { movie: movie.toObject() } ))
    // on error continue to error handling middleware
    .catch(next)
})

// Create: POST /movies save the movie data
router.post('/movies', requireToken, (req, res, next) => {
  //get movie data
  console.log(req.body)
  console.log(req.user)
  req.body.movie.author = req.user._id
  const movie = req.body.movie
  const title = movie.title
  const author = movie.author
  //save to mongodb
  Movie.create(movie)
    .then(movie =>res.status(201).json( { movie: movie } ))
    .catch(next)
    //
})
// Destroy: DELETE /movies/:id delete the movie
router.delete('/movies/:id', requireToken, (req, res, next) => {
  const id = req.params.id
  Movie.findById(id)
    .then(handle404)
    .then(movie => {
      requireOwnership(req, movie)
      movie.deleteOne()})
    .then(() => res.sendStatus(204))

    //
    .catch(next)
})

// Update: PATCH /movies/:id delete the movie
router.patch('/movies/:id', requireToken, removeBlanks, (req, res, next) => {
  delete req.body.movie.author
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
      requireOwnership(req, movie)
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
