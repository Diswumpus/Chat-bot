const mongoose = require('mongoose');

const prSchema = new mongoose.Schema({
    user: String,
    edit: Boolean,
    delete: Boolean,
    admin: Boolean
});

const prModel = module.exports = mongoose.model('permissions', prSchema);