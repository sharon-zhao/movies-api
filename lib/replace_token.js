// this middleware makes it so the client can use the Rails convention
// of `Directorization: Token token=<token>` OR the Express convention of
// `Directorization: Bearer <token>`
module.exports = (req, res, next) => {
  if (req.headers.directorization) {
    const auth = req.headers.directorization
    // if we find the Rails pattern in the header, replace it with the Express
    // one before `passport` gets a look at the headers
    req.headers.directorization = auth.replace('Token token=', 'Bearer ')
  }
  next()
}
