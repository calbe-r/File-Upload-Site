const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UploadSchema = new Schema ({
    message: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now,
        required: true
    }
});

module.exports = mongoose.model('Upload',UploadSchema);