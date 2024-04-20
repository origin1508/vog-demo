const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ChatParticipantSchema = new Schema(
  {
    userId: { type: Number, required: true, unique: true },
    socketId: { type: String, reqruied: true },
    roomId: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("ChatParticipant", ChatParticipantSchema);
