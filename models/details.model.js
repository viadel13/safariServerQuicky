const mongoose = require('mongoose');

const DetailSchema = mongoose.Schema({
  caracteristiques: String,
  poids: String,
  commentaires: String,
  phone: String,
  },
  {
    timestamps: true
  }
);

const Detail = mongoose.model("Detail", DetailSchema);

module.exports = Detail;