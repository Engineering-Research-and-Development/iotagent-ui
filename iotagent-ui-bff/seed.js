const User = require("./models/User");

module.exports = {
    createAdmin: async function (){
        const admin = await new User({
            username: "admin",
            password: "admin"
          })
          await admin.save();
    }
}