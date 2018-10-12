const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  imgPath: String,
  sport: String,
  team: String,
  staffingDivision: String,
  role: String,
  name: String,
  username: String,
  password: String
});

// let User;
// try {
//   User = mongoose.model("User");
// } catch (error) {
//   users = mongoose.model("User", userSchema);
// }
const User = mongoose.model("User", userSchema);

module.exports = User;
