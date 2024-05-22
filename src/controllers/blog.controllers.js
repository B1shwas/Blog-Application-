const Blog = require("../models/blog.model");
const Comment = require("../models/comment.model");

const getBlogPage = (req, res) => {
  res.render("addBlog", {
    user: req.user,
  });
};

const addNewBlog = async (req, res) => {
  const { title, body } = req.body;
  if (!req.user)
    return res.render("login", {
      loginPlease: "Please login to add a blog",
    });
  const blog = await Blog.create({
    title,
    body,
    createdBy: req.user._id,
    coverImageUrl: `/uploads/${req.file.filename}`,
  });

  return res.redirect(`/blog/${blog._id}`);
};

const goToBlogPage = async (req, res) => {
  const blog = await Blog.findById(req.params.id).populate("createdBy");
  const comments = await Comment.find({ blogId: req.params.id }).populate(
    "createdBy"
  );
  return res.render("blog", {
    user: req.user,
    blog,
    comments,
  });
};

module.exports = {
  getBlogPage,
  addNewBlog,
  goToBlogPage,
};
