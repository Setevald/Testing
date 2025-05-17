// controllers/messageController.js
const db = require('../config/db');

// 1. Send Message (User or Admin)
exports.sendMessage = async (req, res) => {
  const ticketId = req.params.ticketId;
  const senderId = req.user.id;
  const { message } = req.body;

  try {
    // Optional: Check if ticket exists and if sender is authorized
    const [ticketRows] = await db.query('SELECT * FROM tickets WHERE id = ?', [ticketId]);
    const ticket = ticketRows[0];
    if (!ticket) return res.status(404).json({ error: 'Ticket not found' });

    if (req.user.role === 'user' && ticket.user_id !== senderId)
      return res.status(403).json({ error: 'You are not allowed to message this ticket' });

    await db.query(
      'INSERT INTO messages (ticket_id, sender_id, message) VALUES (?, ?, ?)',
      [ticketId, senderId, message]
    );

    res.status(201).json({ message: 'Message sent' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// 2. Get All Messages in a Ticket
exports.getTicketMessages = async (req, res) => {
  const ticketId = req.params.ticketId;
  const userId = req.user.id;

  try {
    // Check ticket ownership (if user)
    const [ticketRows] = await db.query('SELECT * FROM tickets WHERE id = ?', [ticketId]);
    const ticket = ticketRows[0];
    if (!ticket) return res.status(404).json({ error: 'Ticket not found' });

    if (req.user.role === 'user' && ticket.user_id !== userId)
      return res.status(403).json({ error: 'Not your ticket' });

    const [messages] = await db.query(
      `SELECT messages.*, users.name AS sender_name
       FROM messages 
       JOIN users ON messages.sender_id = users.id
       WHERE messages.ticket_id = ?
       ORDER BY messages.sent_at ASC`,
      [ticketId]
    );

    res.json(messages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};
