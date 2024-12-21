const express = require('express');
const auth = require('../middlewares/auth');
const { Post } = require('../models');

const router = express.Router();

router.get('/', auth, async (req, res) => {
  const posts = await Post.findAll();
  res.json(posts);
});

router.post('/', auth, async (req, res) => {
  const post = await Post.create({ ...req.body, userId: req.user.id });
  res.json(post);
});

module.exports = router;
