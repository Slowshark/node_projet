const express = require('express');
const auth = require('../middlewares/auth');
const { Comment } = require('../models');

const router = express.Router();

router.post('/', auth, async (req, res) => {
  const comment = await Comment.create({ ...req.body, userId: req.user.id });
  res.json(comment);
});

module.exports = router;
