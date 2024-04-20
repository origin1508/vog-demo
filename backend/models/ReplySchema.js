const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const AutoIncrement = require("mongoose-sequence")(mongoose);

const ReplySchema = new Schema(
  {
    commentId: { type: Number, required: true },
    writerId: { type: Number, required: true },
    postId: { type: Number, requied: true },
    content: { type: String, required: true },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

ReplySchema.virtual("user", {
  ref: "User",
  localField: "writerId",
  foreignField: "id",
  justOne: true,
});

ReplySchema.plugin(AutoIncrement, { id: "reply_seq", inc_field: "id" });

module.exports = mongoose.model("Reply", ReplySchema);
