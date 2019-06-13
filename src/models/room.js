const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const RoomSchema = new Schema({
  name: String,
  code: String,
  floor: Number
});

module.exports = Mongoose.model("Room", RoomSchema);
