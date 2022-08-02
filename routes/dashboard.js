const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('This is where the dashboard are going to be.')
});



module.exports = router;