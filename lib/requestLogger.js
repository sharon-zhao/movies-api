const requestLogger = function (req, res, next) {
  console.log('\n===== Incoming Request =====\n')
  console.log(`${new Date()}`)
  console.log(`${req.method} ${req.url}`)
  console.log(`body: ${JSON.stringify(req.body)}`)
  console.log('\n============================\n')
  //middleware run the next middleware
  next()
}
module.exports = requestLogger
