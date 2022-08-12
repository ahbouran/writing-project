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
    console.log('Topic added')
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
})

router.delete('/:_id', (req, res) => {
  Topic.deleteOne(req.params)
  .then(() => console.log('Topic deleted'))
  .catch((err) => console.log('error:', err))
});

router.patch('/:_id', (req, res) => {
  const filter = { _id: req.params._id};
  const update = { name: req.body.name };


  Topic.findOneAndUpdate(filter, update, {
    new: true
  })
  .then(() => console.log('Topic updated'))
  .catch((err) => console.log('err: ', err))
})



module.exports = router;