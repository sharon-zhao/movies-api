'use strict'

class OwnershipError extends Error {
  constructor () {
    super()
    this.name = 'OwnershipError'
    this.message = 'The provided token does not match the owner of this document'
  }
}

class BadCredentialsError extends Error {
  constructor () {
    super()
    this.name = 'BadCredentialsError'
    this.message = 'The provided username or password is incorrect'
  }
}

// this method checks if the user trying to modify a resource is the owner of
// resource, and throws an error if not

// `requestObject` should be the actual `req` object from the route file
const requireOwnership = (requestObject, resource) => {
  // `requestObject.user` will be defined in any route that uses `requireToken`
  // `requireToken` MUST be passed to the route as a second argument
  const owner = resource.author._id ? resource.author._id : resource.author
  //  check if the resource.owner is an object in case populate is being used
  //  if it is, use the `_id` property and if not, just use its value
  if (!requestObject.user._id.equals(owner)) {
    throw new OwnershipError()
  }
}

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
  requireOwnership,
  BadCredentialsError,
  handle404,
  handlePasswordConfirmation,
  handlePasswordComparison,
  handleChangePassword
}
