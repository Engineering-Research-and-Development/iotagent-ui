const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ServiceSchema = require('./Service');

const AgentSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        auto: true
    },
    type: {
        type: Schema.Types.String,
        required: true
    },
    host: {
        type: Schema.Types.String,
        required: true
    },
    port: {
        type: Schema.Types.String,
        required: true
    },
    apiKey: {
        type: Schema.Types.String,
        required: true
    },
    img: {
        type: Schema.Types.String,
        required: true
    },
    services: [ServiceSchema]
});

module.exports = mongoose.model('agent', AgentSchema);