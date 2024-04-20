const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FriendSchema = new Schema(
  {
    userId: { type: Number, required: true },
    targetId: { type: Number, required: true },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

FriendSchema.virtual("following", {
  ref: "User",
  localField: "targetId",
  foreignField: "id",
  justOne: true,
});

module.exports = mongoose.model("Friend", FriendSchema);
