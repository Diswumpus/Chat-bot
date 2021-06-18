const mongoose = require('mongoose');

const CatSchema = new mongoose.Schema({
    user: String,
    message: String,
    reply: String,
    words: [String],
    followups: String
});

const CatModel = module.exports = mongoose.model('message', CatSchema);