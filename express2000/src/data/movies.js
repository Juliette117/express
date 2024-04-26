const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    titre: { type: String, required: true },
    description: { type: String, required: true, unique: true },
    realisateur: { type: String, required: true },
    realeaseDate: { type: String, required:true }
  });



