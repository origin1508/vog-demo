const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SocketSessionSchema = new Schema({
  sessionId: { type: String, required: true },
  socketId: { type: String, required: true },
});

module.exports = mongoose.model("SocketSession", SocketSessionSchema);
