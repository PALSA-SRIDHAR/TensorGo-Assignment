const mongoose = require('mongoose');

const InvoiceSchema = new mongoose.Schema({
  userId: String,
  clientEmail: String,
  amount: Number,
  dueDate: Date,
  status: String, // 'due', 'paid', 'overdue'
  remindersSent: [Date]
});

module.exports = mongoose.model('Invoice', InvoiceSchema);
