const express = require("express");
const path = require("path");
const dotenv = require("dotenv");

const userRouter = require("./routes/user.routes");
const { connectDB } = require("./db");

const app = express();
const PORT = 3000;
dotenv.config({
  path: "./.env",
});

connectDB();

app.use(express.urlencoded({ extended: false }));
app.use("/user", userRouter);

app.set("view engine", "ejs");
app.set("views", path.resolve("./src/views"));

app.get("/", (req, res) => {
  res.render("home");
});

app.listen(PORT, () => {
  console.log(`Server is listening at PORT:${PORT}`);
});
