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

module.exports = mongoose.model('Movie', movieSchema)
