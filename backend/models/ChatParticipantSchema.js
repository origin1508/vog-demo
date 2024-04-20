const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ChatParticipantSchema = new Schema(
  {
    userId: { type: Number, required: true, unique: true },
    socketId: { type: String, reqruied: true },
    roomId: { type: String, required: true },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

ChatParticipantSchema.virtual("user", {
  ref: "User",
  localField: "userId",
  foreignField: "id",
  justOne: true,
});

module.exports = mongoose.model("ChatParticipant", ChatParticipantSchema);
