const express = require('express');
const axios = require('axios');
const router = express.Router();
const Invoice = require('../models/Invoice');

router.post('/trigger', async (req, res) => {
  const { invoiceId } = req.body;
  const invoice = await Invoice.findById(invoiceId);
  if (!invoice) return res.status(404).send('Invoice not found');

  invoice.remindersSent.push(new Date());
  await invoice.save();

  await axios.post('https://hooks.zapier.com/hooks/catch/22441162/20986rq/', {
    invoiceId: invoice.id,
    amount: invoice.amount,
    dueDate: invoice.dueDate,
    email: invoice.clientEmail,
    userId: invoice.userId
  });

  res.send({ success: true });
});

module.exports = router;
