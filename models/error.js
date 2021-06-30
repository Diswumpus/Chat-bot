const mongoose = require('mongoose');

const erSchema = new mongoose.Schema({
    id: String,
    error: String,
    user: String,
    guild: String,
    solved: String
});

const erModel = module.exports = mongoose.model('errors', erSchema);