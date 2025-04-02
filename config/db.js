const mongoose = require("mongoose"); //importation

module.exports.connectToMongoDb = async () => {
  mongoose.set("strictQuery", false);
  mongoose.connect(process.env.Mongodb_url) 
    .then(
        () => { console.log("connnect to db") }
    ) 
    .catch((err) => {
      console.log(err);
    });
};