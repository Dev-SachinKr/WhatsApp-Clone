import React, { useState } from 'react';
import axios from 'axios';

// Axios default base URL from env
// axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;

const SendMessageBox = ({ wa_id, name, onMessageSent }) => {
  const [inputText, setInputText] = useState('');

  const sendMessage = async () => {
    if (!inputText.trim()) return;

    const payload = { wa_id, name, text: inputText };
    // console.log('📨 Sending message:', payload);

    try {
      await axios.post('/api/messages', payload);
      setInputText('');
      onMessageSent();
    } catch (error) {
      console.error('Send message error:', error?.response?.data || error.message);
      alert('Message bhejne me error aaya!');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') sendMessage();
  };

  return (
    <div className="p-3 border-t border-gray-200 flex items-center bg-white">
      <input
        type="text"
        placeholder="Type a message"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        onKeyDown={handleKeyPress}
        className="flex-grow px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 transition"
      />
      <button
        onClick={sendMessage}
        className="ml-3 bg-green-500 hover:bg-green-600 active:bg-green-700 text-white font-semibold px-5 py-2 rounded-full shadow-md transition-shadow"
        aria-label="Send message"
      >
        Send
      </button>
    </div>
  );
};

export default SendMessageBox;
