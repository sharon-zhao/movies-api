'use strict'
// requiring the mongoose library
const mongoose = require('mongoose')
// const commentsSchema = require('./comment')

const Schema = mongoose.Schema

const commentSchema = new Schema(
  {
    title:{
      type:String,
      required:true
    },
    body:{
      type:String,
      required:true
    },
   commenter:{
     type:String,
     required: true
   },
   author: {
     type:Schema.Types.ObjectId,
     ref: 'User',
     required: true
   }
  },
  {
    timestamps:true
  }
)
// module.exports = mongoose.model('Comment', commentSchema)
module.exports = commentSchema
