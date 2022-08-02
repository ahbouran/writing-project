const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('This is where the topics will be')
});


module.exports = router;