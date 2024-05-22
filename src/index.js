const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

const Blog = require("./models/blog.model");

const userRouter = require("./routes/user.routes");
const blogRouter = require("./routes/blog.routes");
const { connectDB } = require("./db");
const {
  checkForAuthenticationCookie,
} = require("./middlewares/authentication.middlewares");

dotenv.config({
  path: "./.env",
});
const app = express();
const PORT = 3000;

connectDB();

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.resolve("./public")));
app.use(checkForAuthenticationCookie("token"));

app.set("view engine", "ejs");
app.set("views", path.resolve("./src/views"));

app.get("/", async (req, res) => {
  const allBlogs = await Blog.find({});
  res.render("home", {
    user: req.user,
    blogs: allBlogs,
  });
});

app.use("/user", userRouter);
app.use("/blog", blogRouter);

app.listen(PORT, () => {
  console.log(`Server is listening at PORT:${PORT}`);
});
