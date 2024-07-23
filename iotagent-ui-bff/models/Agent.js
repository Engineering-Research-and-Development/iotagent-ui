const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ServiceSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        auto: true
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
    mongoDatabase: {
      type: Schema.Types.String,
      required: false
    },
    services: [ServiceSchema]
});

const Agent = mongoose.model('agent', AgentSchema);
module.exports = Agent;
