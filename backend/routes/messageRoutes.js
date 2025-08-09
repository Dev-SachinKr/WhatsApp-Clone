const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

// GET /api/chats – All unique users (wa_id)
router.get('/chats', async (req, res) => {
  try {
    const chats = await Message.aggregate([
      {
        $group: {
          _id: '$wa_id',
          name: { $first: '$name' },
          lastMessage: { $last: '$text' },
          lastTimestamp: { $max: '$timestamp' }
        }
      },
      { $sort: { lastTimestamp: -1 } }
    ]);
    res.json(chats);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch chats' });
  }
});

// GET /api/messages/:wa_id – Messages for a user
router.get('/messages/:wa_id', async (req, res) => {
  const { wa_id } = req.params;
  try {
    const messages = await Message.find({ wa_id }).sort({ timestamp: 1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

// POST /api/messages – Add a new (demo) message
router.post('/messages', async (req, res) => {
  const { wa_id, name, text } = req.body;

  if (!wa_id || !text) {
    return res.status(400).json({ error: 'wa_id and text are required' });
  }

  const message = new Message({
    wa_id,
    name: name || 'Unknown',
    text,
    type: 'text',
    timestamp: Math.floor(Date.now() / 1000),
    fromMe: true,
    status: 'sent',
    message_id: 'demo_' + Date.now()
  });

  try {
    const saved = await message.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: 'Failed to save message' });
  }
});

module.exports = router;
