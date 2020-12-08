const mongoose = require("mongoose");
const { MONGODB_URI } = require("./index");

const connectMongoose = () =>
  mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });

mongoose.connection.on("connected", () => {
  console.log("DB CONNECTED");
});

// If the connection throws an error
mongoose.connection.on("error", function (err) {
  console.log("Mongoose default connection error: " + err);
});

// When the connection is disconnected
mongoose.connection.on("disconnected", function () {
  console.log("Mongoose default connection disconnected");
});

module.exports = connectMongoose;
