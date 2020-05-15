'use strict'
class DocumentNotFoundError extends Error {
  constructor() {
    super();
    //define the errors name
    this.name = 'DocumentNotFoundError'
    //difine the error message
    this.message = 'ID does not match any book ID in database'
  }
}
//accepts in a document form mongoose
const handle404 = function(doc){
  if (doc === null) {
    //throw the error
    throw new DocumentNotFoundError()
  }
  return doc
}
module.exports = {
  handle404
}
