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

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

app.use(cors(corsOption));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/auth", authRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server is running at: http://localhost:${PORT}`);
});
