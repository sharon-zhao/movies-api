const mongoose = require('mongoose');

const URI = 'mongodb+srv://heroku_qxdtrwmw:Zxr2303811992@cluster-qxdtrwmw.wmot7.mongodb.net/heroku_qxdtrwmw?retryWrites=true&w=majority';

const connectDB = async () => {
  await mongoose.connect(URI);
  console.log('db connected...!')
};

module.exports = connectDB
