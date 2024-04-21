require("dotenv").config();
const { PORT, MONGO_URI } = process.env;
const corsOption = {
  origin: "http://localhost:3002",
  credentials: true,
};

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { Server } = require("socket.io");
const { createServer } = require("node:http");
const { setupSocket } = require("./controllers/socketController");

mongoose
  .connect(MONGO_URI, { dbName: "main" })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

const app = express();

app.use(cors(corsOption));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const server = createServer(app);
const io = new Server(server);
setupSocket(io);

const authRouter = require("./router/authRouter");
const usersRouter = require("./router/usersRouter");
const postsRouter = require("./router/postsRouter");
const likeRouter = require("./router/likeRouter");
const commentsRouter = require("./router/commentsRouter");
const repliesRouter = require("./router/repliesRouter");
const friendRouter = require("./router/friendRouter");
const chatsRouter = require("./router/chatsRouter");

app.use("/auth", authRouter);
app.use("/users", usersRouter);
app.use("/posts", postsRouter);
app.use("/like", likeRouter);
app.use("/comments", commentsRouter);
app.use("/replies", repliesRouter);
app.use("/friend", friendRouter);
app.use("/chats", chatsRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

server.listen(PORT, () => {
  console.log(`Server is running at: http://localhost:${PORT}`);
});
