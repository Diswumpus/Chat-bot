const mongoose = require('mongoose');

const chSchema = new mongoose.Schema({
    guild: String,
    ch: String
});

const chModel = module.exports = mongoose.model('channel', chSchema);