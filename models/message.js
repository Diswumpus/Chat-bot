const mongoose = require('mongoose');

const CatSchema = new mongoose.Schema({
    message: String,
    reply: String
});

const CatModel = module.exports = mongoose.model('message', CatSchema);