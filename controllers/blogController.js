const { Blog } = require("../model/blog");

const BlogController = {
  //ADD
  addBlog: async (req, res) => {
    try {
      const dataNotLinkUrl = await Blog.find({ linkUrl: req.body.linkUrl });
      if (dataNotLinkUrl.length > 0) {
        return res.status(400).json("Link bài viết đã tồn tại!");
      }
      const newBlog = new Blog({ ...req.body });
      const savedBlog = await newBlog.save();
      res.status(200).json({
        messenger: "success",
        response: savedBlog,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //GET ALL
  getAllBlog: async (req, res) => {
    try {
      const allBlog = await Blog.find();
      res.status(200).json({
        messenger: "success",
        response: allBlog,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  getBlogNew: async (req, res) => {
    try {
      const newBlog = await Blog.find({ active: true }).sort("-createdAt");
      const data = newBlog.slice(0, 5);
      res.status(200).json({
        messenger: "success",
        response: data,
      });
    } catch (error) {
      res.status(500).json(error);
    }
  },
  //update
  updateBlog: async (req, res) => {
    try {
      const blog = await Blog.findById(req.params.id);
      const newBlog = await blog.updateOne({ $set: req.body });
      res.status(200).json({
        messenger: "success",
        response: newBlog,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //delete
  deleteBlog: async (req, res) => {
    try {
      const blog = await Blog.findById(req.params.id);
      await Blog.findByIdAndDelete(req.params.id);
      res.status(200).json({
        messenger: "success",
      });
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = BlogController;
