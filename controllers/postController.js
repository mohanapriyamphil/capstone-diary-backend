const Post = require("../models/postModel");
const mongoose = require("mongoose");

//getting all the posts
const getAllPosts = async (req, res) => {
  const user_id = req.user._id

  const posts = await Post.find({ user_id }).sort({ createdAt: -1 });
  res.status(200).json(posts);
};

//get a single post
const getPost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "post does not exist" });
  }
  const post = await Post.findById(id);

  if (!post) {
    return res.status(404).json({ error: "post does not exist" });
  }
  res.status(200).json(post);
};

//creating a post
const createPost = async (req, res) => {
  const { date, title, content } = req.body;

  let emptyFields = []

  if (!date) {
    emptyFields.push('date')
  }
  if (!title) {
    emptyFields.push('title')
  }
  if (!content) {
    emptyFields.push('content')
  }
  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
  }

  //add doc to db
  try {
    const user_id = req.user._id
    const post = await Post.create({ date, title, content, user_id });
    res.status(200).json(post);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//delete a post
const deletePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "post does not exist" });
  }

  const post = await Post.findOneAndDelete({ _id: id });

  if (!post) {
    return res.status(404).json({ error: "post does not exist" });
  }

  res.status(200).json(post);
};

//updating a post
const updatePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "post does not exist" });
  }
  const post = await Post.findOneAndUpdate({ _id: id }, { ...req.body });
  
  if (!post) {
    return res.status(404).json({ error: "post does not exist" });
  }

  res.status(200).json(post);
};

module.exports = { getAllPosts, getPost, createPost, deletePost, updatePost }
