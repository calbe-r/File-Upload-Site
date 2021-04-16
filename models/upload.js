const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UploadSchema = new Schema ({
    message: {
        type: String,
        required: true
    },
    date: {
        type: date,
        default: date.now
    }
});

module.exports = mongoose.model('Upload',UploadSchema);