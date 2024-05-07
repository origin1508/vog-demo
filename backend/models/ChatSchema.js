const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { randomUUID } = require("crypto");

const ChatSchema = new Schema(
  {
    roomId: { type: String, default: () => randomUUID() },
    title: { type: String, required: true },
    game: { type: String, requried: true },
    maximumMember: { type: Number, required: true, min: 2 },
    currentMember: {
      type: Number,
      default: 0,
      validate: {
        validator: function (v) {
          return v <= this.maximumMember;
        },
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Chat", ChatSchema);
