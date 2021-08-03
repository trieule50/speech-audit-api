const express = require('express');
const router = express.Router();

const Text = require('../models/text');

// GET (index)
router.get('/', (req, res) => {
  Text.find({})
    .then((texts) => res.json(texts))
    .catch(console.error);
});

// GET (show) 
router.get('/:id', (req, res) => {
  Text.findById(req.params.id)
    .then((text) => res.json(text))
    .catch(console.error);
});

// POST (create) 
router.post('/', (req, res) => {
  Text.create(req.body)
    .then((text) => res.status(201).json(text))
    .catch(console.error);
});

// PUT (update) 
router.put('/:id', (req, res) => {
  Text.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })
    .then((text) => res.json(text))
    .catch(console.error);
});

// DELETE (delete) 
router.delete('/:id', (req, res) => {
  Text.findByIdAndDelete(req.params.id)
    .then(() => res.sendStatus(204))
    .catch(console.error);
});

module.exports = router;