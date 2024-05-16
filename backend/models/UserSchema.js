const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const AutoIncrement = require("mongoose-sequence")(mongoose);

const UserSchema = new Schema(
  {
    nickname: { type: String, required: true, unique: true },
    oauthId: { type: String, required: true, unique: true },
    provider: { type: String, required: true },
    profileUrl: {
      type: String,
      required: true,
      default: "/image/blank_profile.png",
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.plugin(AutoIncrement, { id: "user_seq", inc_field: "id" });

module.exports = mongoose.model("User", UserSchema);
