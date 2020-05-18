'use strict'
// require dependencies
const express = require('express')
// create an express router object
const router = express.Router()
// require movie model
const Person = require('./../models/person')
// require custom error handlers
const customErrors = require('./../../lib/customError')
const handle404 = customErrors.handle404
// Index: GET /movies return all the movies
router.get('/persons', (req, res, next) => {
 // fetch all movies from mongodb
 Person.find()
  // use mongoose toObject on each movie to include virtuals
  .then(people => people.map(people => people.toObject()))
  // send response 200 with movies to client
  .then(peoples => res.json( { person: peoples } ))
  // on error respond with 500 and error message
  .catch(next)
})
// Show: GET /movies/100 return a movie
router.get('/persons/:id', (req, res, next) => {
  // get id of movie from params
  const id = req.params.id
  // fetching movie by its id
  Person.findById(id)
    // handle 404 error if no movie found
    .then(handle404)
    // .then(movies => movies.map(movie=>movie.toObject()))
    // respond with json of the movie
    // use mongoose toObject on movie to include virtuals
    .then(people => res.json( { person: people.toObject() } ))
    // on error continue to error handling middleware
    .catch(next)
})
// Create: POST /movies save the movie data
router.post('/persons', (req, res, next) => {
  //get movie data
  const person = req.body.person
  //save to mongodb
  Person.create(person)
    .then(person => res.status(201).json( { person: person } ))
    // on error respond with 500 and error message
    .catch(next)
})
// Destroy: DELETE /movies/:id delete the movie
router.delete('/persons/:id', (req, res, next) => {
  const id = req.params.id
  Person.findById(id)
    .then(handle404)
    .then(people => people.deleteOne())
    .then(() => res.sendStatus(204))
    //
    .catch(next)
})

// Update: PATCH /movies/:id delete the movie
router.patch('/persons/:id', (req, res, next) => {
  // get id of movie from params
  const id = req.params.id
  // get movie data from request
  const personData = req.body.person
  // fetching movie by its id
  Person.findById(id)
    // handle 404 error if no movie found
    .then(handle404)
    // update movie
    .then(people => {
      // updating movie object
      // with movieData
      Object.assign(people, personData)
      // save movie to mongodb
      return people.save()
    })
    // if successful return 204
    .then(() => res.sendStatus(204))
    // on error go to next middleware
    .catch(next)
})

module.exports = router