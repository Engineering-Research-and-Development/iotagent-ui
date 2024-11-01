const express = require('express');
const morgan = require("morgan");
const cors = require("cors");
const errorhandler = require('errorhandler');
const mongoose = require('mongoose');
const keycloak = require('./middlewares/keycloak');

const config = require("./config")
const seed = require("./seed")

const isProduction = config.stage == "production";

const app = express();
app.use(express.urlencoded({ extended: true }));
if(process.env.KEYCLOAK_URL) {
  app.use(keycloak.middleware());
}
app.use(express.json());
app.use(morgan('combined'));
app.use(cors());
app.disable('etag');

mongoose.connect(`mongodb://${config.mongo_host}:${config.mongo_port}/${config.mongo_db}`)

mongoose.connection.on('open',() => {
  console.log("MongoDB Connection OK");
  if(config.admin_account){
    console.log("Default admin account created");
    seed.createAdmin();
  }
});

mongoose.connection.on('error',(err) => {
  console.log("MongoDB Connection Fail",err);
});

if (!isProduction) {
  app.use("/api",require('./routes'));
}else{
  app.use(require('./routes'));
}
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

process.on('uncaughtException', function(err) {
  console.error(err);
});

app.listen(config.port, () => {
  console.log('IoTAgent UI BFF started on port: ' + config.port)
});
