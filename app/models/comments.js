'use strict'
// requiring the mongoose library
const mongoose = require('mongoose')

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
     type:Schema.Types.ObjectId,
     ref: 'Person'
   }
  },
  {
    timestamps:true
  }
)
// module.exports = mongoose.model('Comment', commentSchema)
module.exports = commentSchema
