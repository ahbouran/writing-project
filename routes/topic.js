const express = require('express');
const router = express.Router();
const Topic = require('../models/topics');

router.get('/', (req, res) => {
  Topic.find()
  .then(topics => res.json(topics))
  .catch(err => res.status(400).json('Error: ' + err))
});

router.get('/:_id', (req, res) => {
  Topic.find( {"_id": req.params._id})
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

router.delete('/:_id', (req, res) => {
  Topic.deleteOne(req.params)
  .then(() => console.log('Topic deleted'))
  .catch((err) => console.log.og('error'))
});


module.exports = router;