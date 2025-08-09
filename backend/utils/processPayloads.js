const fs = require('fs');
const path = require('path');
const Message = require('../models/Message');

const payloadDir = path.join(__dirname, '..', 'payloads');

const processPayloads = async () => {
  const files = fs.readdirSync(payloadDir);

  for (const file of files) {
    const raw = fs.readFileSync(path.join(payloadDir, file));
    const data = JSON.parse(raw);

    const entry = data?.metaData?.entry?.[0];
    const change = entry?.changes?.[0];
    const value = change?.value;

    // Message Payload (user or business)
    if (value?.messages) {
      const message = value.messages[0];
      const contact = value.contacts?.[0];
      const businessNumber = value.metadata?.display_phone_number;

      if (message && contact) {
        const msgData = {
          wa_id: contact.wa_id,
          name: contact.profile?.name || 'Unknown',
          message_id: message.id,
          text: message.text?.body || '',
          type: message.type,
          timestamp: parseInt(message.timestamp),
          fromMe: message.from === businessNumber, 
        };

        try {
          await Message.create(msgData);
          console.log(`Message inserted: ${msgData.message_id}`);
        } catch (err) {
          if (err.code === 11000) {
            console.log(`Duplicate message skipped: ${msgData.message_id}`);
          } else {
            console.error(' Error inserting message:', err.message);
          }
        }
      }
    }

    // Status Payload (e.g., delivered/read)
    if (value?.statuses) {
      const status = value.statuses[0];

      try {
        const updated = await Message.findOneAndUpdate(
          { message_id: status.id },
          {
            status: status.status,
            conversation_id: status.conversation?.id || '',
          },
          { new: true }
        );

        if (updated) {
          console.log(`Status updated: ${status.status} → ${status.id}`);
        } else {
          console.log(`Message not found for status ID: ${status.id}`);
        }
      } catch (err) {
        console.error('Error updating status:', err.message);
      }
    }
  }

  console.log('All payloads processed.');
};

module.exports = processPayloads;
