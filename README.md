# WhatsApp Clone (Web Interface)

A full-stack WhatsApp-style chat interface built with **React**, **Node.js**, and **MongoDB**, that supports two-way messaging, message status tracking (sent/delivered/read), and automatic webhook-based message ingestion.

---

## 🚀 Features

- 📥 **Real-time message fetching** from saved payloads
- 🟢 **Send messages** to a contact from the frontend
- ✅ **Message status tracking** (sent, delivered, read) using SVG tick icons
- 💬 Chat UI with WhatsApp-like layout and design
- 🔄 Auto-refresh after message sent
- 🧠 Message ownership detection (`fromMe`)
- 📦 Payload processor for simulated webhooks

---

## 🛠 Tech Stack

- **Frontend**: React, TailwindCSS
- **Backend**: Node.js, Express
- **Database**: MongoDB (via Mongoose)
- **Payload Processing**: Local `.json` files for simulation
