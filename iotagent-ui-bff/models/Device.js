const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DeviceSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    auto: true
  },
  apiKey: {
    type: Schema.Types.String,
    required: true
  },
  service: {
    type: Schema.Types.String,
    required: true
  },
  subservice: {
    type: Schema.Types.String,
    required: true
  }
});

const Device = mongoose.model('devices', DeviceSchema);
module.exports = Device;
