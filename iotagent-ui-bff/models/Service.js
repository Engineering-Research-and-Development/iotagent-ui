const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ServiceSchema = new Schema({
    id: {
        type: Schema.Types.UUID,
        required: true,
        unique: true
    },
    service: {
        type: Schema.Types.String,
        required: true
    },
    servicePath: {
        type: Schema.Types.String,
        required: true
    }
});

module.exports = mongoose.model('agent', ServiceSchema);