'use strict'
// requiring the mongoose library
const mongoose = require('mongoose')

const Schema = mongoose.Schema

const personSchema = new Schema(
  {
    firstName:{
      type:String,
      required:true
    },
    lastName:{
      type:String,
      required:true
    }
  },
  {
    timestamps:true
  }
)

module.exports = mongoose.model('Person', personSchema)
