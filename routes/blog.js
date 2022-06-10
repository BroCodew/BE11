const BlogController = require("../controllers/blogController");

const router = require("express").Router();

router.post("/", BlogController.addBlog);

router.get("/", BlogController.getAllBlog);
router.get("/new-blog", BlogController.getBlogNew);

router.put("/:id", BlogController.updateBlog);

router.delete("/:id", BlogController.deleteBlog);

module.exports = router;
