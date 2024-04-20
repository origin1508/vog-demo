const { randomUUID } = require("crypto");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    id: { type: String, default: randomUUID() },
    nickname: { type: String, required: true, unique: true },
    oauthId: { type: String, required: true, unique: true },
    sex: { type: String, required: true, enum: ["남", "여"] },
    provider: { type: String, required: true },
    profileUrl: {
      type: String,
      required: true,
      default: "/image/blank_profile.png",
    },
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
  }
);

module.exports = mongoose.model("User", UserSchema);
