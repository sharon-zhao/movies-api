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


router.delete('/comments/:comment_id', (req, res, next) => {
  // const movie_id = req.params.movie_id
  const comment_id = req.params.comment_id

  Movie.find()
  .populate('comments.commenter')

  .then(movies => {

    for (const movie of movies) {
      // console.log(movie)
      let comment_list = movie.comments
      for (let i = comment_list.length - 1; i >= 0; --i) {
        if (comment_list[i]._id == comment_id){
            const array = comment_list.splice(i,1)
          array[0].remove()
        }
      }
      movie.save()
    }
  })

  .then(() => res.sendStatus(204))
  .catch(next)

})

  // .then(movies => movies.map(movie => {



    // const movie_list = movie.toObject()
    // console.log(movie_list)
    // for (let [key, value] of Object.entries(movie_list)) {
      // console.log(`${key}: ${value}`);
      // const comment_list = movie_list.comments
      // console.log(comment_list)
      // comment_list.forEach(comment => {
      //   if (comment._id == comment_id) {
      //
      //   }
      // })
      // console.log(comment_list)
      // const target = comment_list.filter(comment => comment._id == comment_id)
      // console.log(target)
        // }
        // console.log(movie_list)
        // for (movie in movie_list) {
        //   // console.log(movie)
        //   const comment_list = movie.comments
        //   console.log(comment_list)
        // }
    // const tag = Object.entries(movie_list)
    // console.log(tag)

      // }
  //   )
  // )

  // Movie.find()
  //   .then(handle404)
  //   .then(books => forEach)
  //   .then(movie =>{
  //   movie.comments.id(comment_id).remove()
  //   movie.save()
  //
  //   })
  //   .then(() => res.sendStatus(204))
  //   .catch(next)
// })

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
