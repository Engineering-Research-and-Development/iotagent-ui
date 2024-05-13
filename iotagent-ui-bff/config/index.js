module.exports = {
    stage: process.env.NODE_ENV || "development",
    port: process.env.PORT || 9000,
    mongo_host: process.env.MONGO_HOST || "localhost",
    mongo_port: process.env.MONGO_PORT || "27017",
    mongo_db: process.env.MONGO_DB || "iotagent_ui",
    auth_secret: process.env.AUTH_SECRET || "SECRET_TOKEN",
    admin_account: process.env.ADMIN_ACCOUNT || false
  };