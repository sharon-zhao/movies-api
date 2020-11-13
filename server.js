// require necessary NPM packages

const multer = require('multer')
const uploadRoutes = require('./app/routes/upload_routes')

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

// require route files
// const exampleRoutes = require('./app/routes/example_routes')
const userRoutes = require('./app/routes/user_routes')

// require middleware
const errorHandler = require('./lib/errorHandler')
const replaceToken = require('./lib/replace_token')
const requestLogger = require('./lib/request_logger')

const movieRoutes = require('./app/routes/movieRoutes')
const commentRoutes = require('./app/routes/commentRoutes')

const db = require('./config/db')
// const conncetDB = require('./config/Newdb')

// require configured passport authentication middleware
const auth = require('./lib/auth')
// define server and client ports
// used for cors and local port declaration
const serverDevPort = 4741
const clientDevPort = 7165

// establish database connection
// use new version of URL parser
// use createIndex instead of deprecated ensureIndex

mongoose.connect(db, {
  useNewUrlParser: true,
  useCreateIndex: true
})

// instantiate express application object
const app = express()

// set CORS headers on response from this API using the `cors` NPM package
// `CLIENT_ORIGIN` is an environment variable that will be set on Heroku
app.use(cors({ origin: process.env.CLIENT_ORIGIN || `http://localhost:${clientDevPort}` }))

// define port for API to run on
const port = process.env.PORT || serverDevPort

// this middleware makes it so the client can use the Rails convention
// of `Directorization: Token token=<token>` OR the Express convention of
// `Directorization: Bearer <token>`

app.use(replaceToken)

// register passport authentication middleware
app.use(auth)

app.use(express.json())
// this parses requests sent by `$.ajax`, which use a different content type
app.use(express.urlencoded({ extended: true }))

// log each request as it comes in for debugging
app.use(requestLogger)

// register route files
// app.use(exampleRoutes)

app.use(userRoutes)

app.use(commentRoutes)

app.use(movieRoutes)

app.use(uploadRoutes)

app.use(errorHandler)

app.listen(port, () => {
  console.log('listening on port ' + port)
})

// needed for testing
module.exports = app
