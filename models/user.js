const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: Buffer,
    required: false,
  },
});

const Users = mongoose.model("Users", userSchema, "users");
module.exports = Users;
