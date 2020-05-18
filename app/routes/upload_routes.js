const express = require('express')
const router = express.Router()
const multer = require('multer')
//create upload object by calling multer when we call multer
//we can pass it an options object 'dest' specifies the folder to store the uploaded files
const upload = multer({ dest: 'uploads/'})
const s3Upload = require('../../lib/s33Upload')
const Upload = require('../models/upload')
//
router.post('/uploads', upload.single('file'), (req, res, next) => {
  console.log(req.file)
    s3Upload(req.file)
     .then(responseData => {

       console.log(responseData)

      return Upload.create({
      //use the title from the input whose name is title
         title:req.body.title,
         //backend response location can see from server run
         imageUrl:responseData.Location
       })
     })
     .then(upload => res.status(201).json({upload: upload.toObject()}))
     .catch(next)
})

//
// router.get('/uploads', (req, res, next) => {
//     Upload.find()
//         .then(uploads => uploads.map(upload => upload.toObject()))
//         .then(uploads => res.json({ uploads }))
//         .catch(console.error)
// })



module.exports = router
