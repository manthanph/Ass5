const express = require('express');
const router  = express.Router();
const Quote   = require('../models/Quote');

// View all quotes
router.get('/', async (req, res) => {
  const quotes = await Quote.find().sort({ createdAt: -1 });
  res.render('quotes', { quotes });
});

// Submit quote from home form
router.post('/request', async (req, res) => {
  await new Quote(req.body).save();
  res.redirect('/quotes');
});

// Delete quote
router.get('/delete/:id', async (req, res) => {
  await Quote.findByIdAndDelete(req.params.id);
  res.redirect('/quotes');
});

module.exports = router;
