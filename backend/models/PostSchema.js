const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const AutoIncrement = require("mongoose-sequence")(mongoose);

const PostSchema = new Schema(
  {
    writerId: { type: Number, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    postCategory: {
      type: String,
      required: true,
      enum: ["free", "humor", "championship"],
    },
    view: { type: Number, default: 0 },
    likes: [Number],
    likeCount: { type: Number, default: 0 },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

PostSchema.virtual("user", {
  ref: "User",
  localField: "writerId",
  foreignField: "id",
  justOne: true,
});

PostSchema.plugin(AutoIncrement, { id: "post_seq", inc_field: "id" });

module.exports = mongoose.model("Post", PostSchema);
