const mongoose = require('../config/mongoose.js');

const newsSchema = new mongoose.Schema({
  author: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    dropDups: true
  },
  content: {
    type: String,
    required: true
  },
  imgUrl: {
    type: String,
    required: true
  },
  publishedAt: Date,
  updatedAt: Date
});

const NewsModel = mongoose.model('News', newsSchema);

module.exports = NewsModel;
