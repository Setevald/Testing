const db = require('../config/db');

// 1. Create Ticket (User)
exports.createTicket = async (req, res) => {
  const { subject, category } = req.body;
  const userId = req.user.id;

  try {
    await db.query(
      'INSERT INTO tickets (user_id, subject, category, status) VALUES (?, ?, ?, ?)',
      [userId, subject, category, 'open']
    );
    res.status(201).json({ message: 'Ticket created successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// 2. Get Current User's Tickets (User)
exports.getUserTickets = async (req, res) => {
  const userId = req.user.id;

  try {
    const [tickets] = await db.query(
      'SELECT * FROM tickets WHERE user_id = ? ORDER BY created_at DESC',
      [userId]
    );
    res.json(tickets);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// 3. Get All Tickets (Admin)
exports.getAllTickets = async (req, res) => {
  try {
    const [tickets] = await db.query(
      `SELECT tickets.*, users.name AS customer_name 
       FROM tickets 
       JOIN users ON tickets.user_id = users.id
       ORDER BY tickets.created_at DESC`
    );
    res.json(tickets);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// 4. Update Ticket Status (Admin)
exports.updateTicketStatus = async (req, res) => {
  const ticketId = req.params.id;
  const { status } = req.body;

  try {
    const [result] = await db.query(
      'UPDATE tickets SET status = ?, updated_at = NOW() WHERE id = ?',
      [status, ticketId]
    );

    if (result.affectedRows === 0) return res.status(404).json({ error: 'Ticket not found' });

    res.json({ message: 'Ticket status updated' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

