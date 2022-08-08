const express = require('express');
const router = express.Router();
const Topic = require('../models/topics');

router.get('/', (req, res) => {
  Topic.find()
  .then(topics => res.json(topics))
  .catch(err => res.status(400).json('Error: ' + err))
});

router.post('/', async (req, res) => {
  const topic = req.body;
  const newTopic = new Topic(topic);

  try {
    await newTopic.save()
    res.status(201).json(newTopic);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }

})


module.exports = router;