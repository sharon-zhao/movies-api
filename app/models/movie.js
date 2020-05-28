'use strict'
const mongoose =require('mongoose')
const commentSchema = require('./comments')
const uploadSchema = require('./upload')
const Schema = mongoose.Schema
const movieSchema =new Schema({
    title: {
      type: String,
      required: true
    },
    director: {
      type: String,
      required: true
    },
    author: {
      type:Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    //if one comment no []
    comments: [commentSchema]
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Movie', movieSchema)
