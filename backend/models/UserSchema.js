const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  nickname: { type: String, required: true, unique: true },
  oauthId: { type: String, required: true, unique: true },
  sex: { type: String, required: true, enum: ["남", "여"] },
  provider: { type: String, required: true },
  profileUrl: { type: String, required: true, default: "" },
  createdAt: { type: Date, required: true, default: Date.now },
  updatedAt: { type: Date, required: true, default: Date.now },
});

module.exports = mongoose.model("User", UserSchema);
