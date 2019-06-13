const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const UserSchema = new Schema({
  name: String,
  email: String,
  username: String,
  password: String,
  token: String
});

module.exports = Mongoose.model("User", UserSchema);
