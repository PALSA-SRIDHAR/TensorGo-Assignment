import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/invoices/due', { withCredentials: true })
      .then(res => setInvoices(res.data))
      .catch(err => console.error(err));
  }, []);

  const triggerReminder = (invoiceId) => {
    axios.post('http://localhost:5000/automation/trigger', { invoiceId }, { withCredentials: true })
      .then(res => alert('Reminder triggered!'))
      .catch(err => console.error(err));
  };

  return (
    <div className="dashboard">
      <h2>Due Invoices</h2>
      <ul>
        {invoices.map(inv => (
          <li key={inv._id}>
            <p><strong>Client:</strong> {inv.clientEmail}</p>
            <p><strong>Amount:</strong> {inv.amount}</p>
            <p><strong>Due Date:</strong> {new Date(inv.dueDate).toLocaleDateString()}</p>
            <button onClick={() => triggerReminder(inv._id)}>Send Reminder</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;