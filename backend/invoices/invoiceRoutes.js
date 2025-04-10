const express = require('express');
const router = express.Router();
const Invoice = require('../models/Invoice');

router.get('/due', async (req, res) => {
  if (!req.user) return res.status(401).send('Unauthorized');
  const invoices = await Invoice.find({ userId: req.user.id, status: 'due'||'overdue' });
  res.send(invoices);
});

router.post('/', async (req, res) => {
  if (!req.user) return res.status(401).send('Unauthorized');
  const invoice = new Invoice({ ...req.body, userId: req.user.id });
  await invoice.save();
  res.send(invoice);
});

module.exports = router;
