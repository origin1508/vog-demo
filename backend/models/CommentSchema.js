const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const AutoIncrement = require("mongoose-sequence")(mongoose);

const CommentSchema = new Schema(
  {
    writerId: { type: Number, required: true },
    postId: { type: Number, required: true },
    content: { type: String, required: true },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

CommentSchema.virtual("user", {
  ref: "User",
  localField: "writerId",
  foreignField: "id",
  justOne: true,
});

CommentSchema.virtual("replies", {
  ref: "Reply",
  localField: "id",
  foreignField: "commentId",
});

CommentSchema.virtual("repliesCount", {
  ref: "Reply",
  localField: "id",
  foreignField: "commentId",
  count: true,
});

CommentSchema.plugin(AutoIncrement, { id: "comment_seq", inc_field: "id" });

module.exports = mongoose.model("Comment", CommentSchema);
