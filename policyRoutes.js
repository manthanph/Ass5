const express = require('express');
const router  = express.Router();
const Policy  = require('../models/Policy');

// View all policies
router.get('/', async (req, res) => {
  const policies = await Policy.find().sort({ createdAt: -1 });
  res.render('policies', { policies });
});

// Show add form
router.get('/add', (req, res) => {
  res.render('add-policy');
});

// Create policy
router.post('/add', async (req, res) => {
  await new Policy(req.body).save();
  res.redirect('/policies');
});

// Show edit form
router.get('/edit/:id', async (req, res) => {
  const policy = await Policy.findById(req.params.id);
  res.render('edit-policy', { policy });
});

// Update policy
router.post('/update/:id', async (req, res) => {
  await Policy.findByIdAndUpdate(req.params.id, req.body);
  res.redirect('/policies');
});

// Delete policy
router.get('/delete/:id', async (req, res) => {
  await Policy.findByIdAndDelete(req.params.id);
  res.redirect('/policies');
});

module.exports = router;
