const mongoose = require("mongoose");

const DB_NAME = "blog";

const connectDB = () => {
  try {
    mongoose.connect(`${process.env.DB_URI}${DB_NAME}`);
    console.log("DB CONNECTED!!");
  } catch (error) {
    console.log("DB CONNECTION FAILED!!!");
  }
};

module.exports = { connectDB };
