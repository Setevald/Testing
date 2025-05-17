const express = require('express');
const { createTicket, getUserTickets, getAllTickets, updateTicketStatus } = require('../controllers/ticketController');
const { authenticate, authorize } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', authenticate, createTicket); // POST /api/tickets
router.get('/my', authenticate, getUserTickets); // GET /api/tickets/my

// Admin-only
router.get('/', authenticate, authorize('admin'), getAllTickets); // GET /api/tickets
router.patch('/:id/status', authenticate, authorize('admin'), updateTicketStatus); // PATCH /api/tickets/:id/status

module.exports = router;
