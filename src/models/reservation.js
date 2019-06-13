const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const ReservationSchema = new Schema({
  code: String,
  day: Number,
  month: Number,
  year: Number,
  username: String
});

module.exports = Mongoose.model("Reservation", ReservationSchema);
