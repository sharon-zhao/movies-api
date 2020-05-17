'use strict'
class DocumentNotFoundError extends Error {
  constructor() {
    super();
    //define the errors name
    this.name = 'DocumentNotFoundError'
    //difine the error message
    this.message = 'Resource Not Found'
  }
}

class BadParamsError extends Error {
  constructor() {
    super();
    // define the errors name
    this.name = 'BadParamsError'
    // define the error message
    this.message = 'A required parameter was omitted or invalid'
  }
}

const handlePasswordComparison = function(result){
  // pw did not match
  if (result === false) {
    throw new BadParamsError()
  }
  // password matched
  return result
}

const handlePasswordConfirmation = function(credentials){
  if (!credentials ||
      !credentials.password ||
      credentials.password !== credentials.password_confirmation) {
        throw new BadParamsError()
  }
  return credentials
}
//accepts in a document form mongoose
const handle404 = function(doc){
  if (doc === null) {
    //throw the error
    throw new DocumentNotFoundError()
  }
  return doc
}

const handleChangePassword = function (passwords) {
  const oldPassword = passwords.old
  const newPassword = passwords.new
  if (!oldPassword || !newPassword) {
    throw new BadParamsError()
  }
  return passwords
}

module.exports = {
  handle404,
  handlePasswordConfirmation,
  handlePasswordComparison,
  handleChangePassword
}
