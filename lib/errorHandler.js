'use strict'
const errorHandler = function(error, req, res, next) {
  // log a rudimentary timestamp
  console.log('\n', new Date().toTimeString())
  // print the error to the server log
  console.log(error.name)

  // default to 500 error code
  let errorCode = 500
  // if DocumentNotFoundError return 404
  // if DocumentNotFoundError return 404
  if (error.name === 'DocumentNotFoundError') {
    errorCode = 404
  // if CastError (invalid Mongodb ID format) return 422
  // or if ValidationError (fails mongoose validations)
} else if(error.name === 'MongoError'){
  error.message = 'The receieved params failed validation'
  errorCode = 422
}
  else if (error.name === 'CastError'
  || error.name === 'ValidationError'
  || error.name === "BadParamsError") {
    errorCode = 422
  }
  // respond with error code and error message to client
  res.status(errorCode).json(error.message)
}
module.exports = errorHandler
