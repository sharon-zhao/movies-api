'use strict'

// instantiate mongodb and mongoose
const express = require('express')
// create an express router object
const router = express.Router()
// require movie model
const Movie = require('./../models/movie')
// require custom error handlers
const customErrors = require('./../../lib/customError')
const removeBlanks = require('./../../lib/remove_blank_fields')
const handle404 = customErrors.handle404
const passport = require('passport')
const requireToken = passport.authenticate('bearer', { session: false })
const customError = require('./../../lib/customErrors')
const requireOwnership = customError.requireOwnership


router.post('/comments', requireToken, (req, res, next) => {
  const comment = req.body.comment
  const movieId = comment.movie_id
  comment.author = req.user.id
  Movie.findById(movieId)
    .then((movie) => {
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
router.get('/comments/:movie_id/:comment_id', requireToken, (req, res, next) => {
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

// router.delete('/comments/:movie_id/:comment_id', (req, res, next) => {
//   const movie_id = req.params.movie_id
//   const comment_id = req.params.comment_id
//   Movie.findById(movie_id)
//     .then(handle404)
//     .then(movie =>{
//       //remove object
//     movie.comments.id(comment_id).remove()
//
//     movie.save()
//
//     })
//     .then(() => res.sendStatus(204))
//     .catch(next)
// })


router.delete('/comments/:comment_id', requireToken, (req, res, next) => {
  // const movie_id = req.params.movie_id
  const comment_id = req.params.comment_id

  Movie.find()
  .populate('comments.commenter')

  .then(movies => {
    // requireOwnership(req, movies)
    for (const movie of movies) {
      // console.log(movie)
      let comment_list = movie.comments
      for (let i = comment_list.length - 1; i >= 0; --i) {
        if (comment_list[i]._id == comment_id){
            const array = comment_list.splice(i,1)
       requireOwnership(req, array[0])
          array[0].remove()
        }
      }
      movie.save()
    }
  })

  .then(() => res.sendStatus(204))
  .catch(next)

})


router.patch('/comments/:movie_id/:comment_id', requireToken, removeBlanks, (req, res, next) => {
  // get id of movie from params
  // console.log(req.params)
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
