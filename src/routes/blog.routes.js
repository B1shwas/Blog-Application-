const express = require("express");
const router = express.Router();

const upload = require("../middlewares/multer.middlewares");

const {
  getBlogPage,
  addNewBlog,
  goToBlogPage,
} = require("../controllers/blog.controllers");
const Blog = require("../models/blog.model");
const Comment = require("../models/comment.model");

router.get("/add-new", getBlogPage);

router.post("/add-new", upload.single("coverImage"), addNewBlog);

router.get("/:id", goToBlogPage);

router.post("/comment/:blogId", async (req, res) => {
  const comment = await Comment.create({
    content: req.body.content,
    blogId: req.params.blogId,
    createdBy: req.user._id,
  });
  return res.redirect(`/blog/${req.params.blogId}`);
});

module.exports = router;
