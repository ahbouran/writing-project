const express = require('express');
const router = express.Router();

router.get('/:id', (req, res) => {
  res.send('This is where the concepts are going to be.')
});

module.exports = router;