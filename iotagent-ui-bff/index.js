const express = require('express');
const bodyParser = require('body-parser');
const morgan = require("morgan");
const errorhandler = require('errorhandler');
const mongoose = require('mongoose');

const config = require("./config")

var isProduction = config.stage;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('combined'))


mongoose.connect(`mongodb://${config.mongo_host}:${config.mongo_port}/${config.mongo_db}`)

mongoose.connection.on('open',()=>{
  console.log("Connection OK");
});

mongoose.connection.on('error',(err)=>{
  console.log("Connection Fail",err);
});

app.use('/api', require('./routes'));
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

if (!isProduction) {
  app.use(errorhandler())
}

/// error handlers
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json(
    {
      "error":{
        message: err.message
      }
    });
});

app.listen(config.port, () => {
  console.log('IoTAgent UI BFF started on port: ' + config.port)
});