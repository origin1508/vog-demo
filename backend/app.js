require("dotenv").config();
const { PORT, MONGO_URI } = process.env;
const whitelist = ["http://localhost:3002", "http://origin1508.iptime.org"];
const corsOptionsDelegate = function (req, callback) {
  let corsOptions;
  if (whitelist.indexOf(req.header("Origin")) !== -1) {
    corsOptions = { origin: true, credentials: true }; // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false }; // disable CORS for this request
  }
  callback(null, corsOptions); // callback expects two parameters: error and options
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

app.use(cors(corsOptionsDelegate));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3002",
    methods: ["GET", "POST"],
  },
});
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
