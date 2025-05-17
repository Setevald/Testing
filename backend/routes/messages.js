const express = require('express');
const { sendMessage, getTicketMessages } = require('../controllers/messageController');
const { authenticate } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/:ticketId', authenticate, sendMessage); // POST /api/messages/:ticketId
router.get('/:ticketId', authenticate, getTicketMessages); // GET /api/messages/:ticketId

module.exports = router;
