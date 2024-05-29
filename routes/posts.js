const express = require("express");
const {
  getAllPosts,
  getPost,
  createPost,
  deletePost,
  updatePost,
} = require("../controllers/postController");
const requireAuth = require('../middleware/requireAuth')

//require auth for all diary entry routes
const router = express.Router();

router.use(requireAuth)

router.get("/", getAllPosts);
router.get("/:id", getPost);
router.post("/", createPost);
router.delete("/:id", deletePost);
router.patch("/:id", updatePost);

module.exports = router;