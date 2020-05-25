const express = require('express')
const router = express.Router()
const multer = require('multer')
const passport = require('passport')
//create upload object by calling multer when we call multer
//we can pass it an options object 'dest' specifies the folder to store the uploaded files
const upload = multer({ dest: 'uploads/'})
const s3Upload = require('./../../lib/s33upload')
const Upload = require('./../models/upload')
const User = require('./../models/user')
const customErrors = require('./../../lib/customError')
const customError = require('./../../lib/customErrors')
const handle404 = customErrors.handle404
const requireToken = passport.authenticate('bearer', { session: false })
const requireOwnership = customError.requireOwnership

//
router.post('/uploads', upload.single('file'), requireToken, (req, res, next) => {

  req.body.author = req.user._id
    s3Upload(req.file)
     .then(responseData => {
      return Upload.create({
      //use the title from the input whose name is title
         title:req.body.title,
         //backend response location can see from server run
         imageUrl:responseData.Location,
         author: req.body.author
       })
     })
     .then(upload => res.status(201).json({upload: upload.toObject()}))
     .catch(next)
})

//
router.get('/uploads', requireToken, (req, res, next) => {
    Upload.find()
       // .then(uploads=> console.log(uploads))
        .then(uploads => uploads.map(upload => upload.toObject()))
        .then(uploads => res.json({ uploads }))
        .catch(console.error)
})


router.get('/uploads/:id', (req, res, next) => {
   const id = req.params.id
    Upload.findById(id)
     .then(handle404)
     .then(image=>console.log(image))
     .then(() => res.sendStatus(204))
     .catch(next)
})

router.delete('/uploads/:id', (req, res, next) => {
   const id = req.params.id
    Upload.findById(id)
     .then(handle404)
     .then(image=>image.deleteOne())
     .then(() => res.sendStatus(204))
     .catch(next)
})


module.exports = router
