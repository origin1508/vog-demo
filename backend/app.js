require("dotenv").config();
const { PORT, MONGO_URI } = process.env;
const corsOption = {
  origin: "http://localhost:3002",
  credentials: true,
};

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const authRouter = require("./router/authRouter");
const usersRouter = require("./router/usersRouter");
const postsRouter = require("./router/postsRouter");
const likeRouter = require("./router/likeRouter");
const commentsRouter = require("./router/commentsRouter");
const repliesRouter = require("./router/repliesRouter");
const friendRouter = require("./router/friendRouter");

mongoose
  .connect(MONGO_URI, { dbName: "main" })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

app.use(cors(corsOption));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/auth", authRouter);
app.use("/users", usersRouter);
app.use("/posts", postsRouter);
app.use("/like", likeRouter);
app.use("/comments", commentsRouter);
app.use("/replies", repliesRouter);
app.use("/friend", friendRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server is running at: http://localhost:${PORT}`);
});
