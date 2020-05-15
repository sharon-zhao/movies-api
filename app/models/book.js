'use strict'
const mongoose =require('mongoose')
const commentSchema = require('./comments')
const Schema = mongoose.Schema
const bookSchema =new Schema({
    title: {
      type: String,
      required: true
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'Person'
    },
    //if one comment no []
    comments: [commentSchema]
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Book', bookSchema)
