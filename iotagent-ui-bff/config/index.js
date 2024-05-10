module.exports = {
    stage: process.env.NODE_ENV,
    port: process.env.NODE_ENV === 'production' 
      ? process.env.PORT 
      :  9000,
    mongo_host: process.env.NODE_ENV === 'production' 
      ? process.env.MONGO_HOST
      : "localhost",
    mongo_port: process.env.NODE_ENV === 'production' 
      ? process.env.MONGO_PORT
      : "27017",
    mongo_db: process.env.NODE_ENV === 'production' 
      ? process.env.MONGO_DB
      : "iotagent-ui",
    auth_secret: process.env.NODE_ENV === 'production' 
      ? process.env.AUTH_SECRET
      : "secret"
  };