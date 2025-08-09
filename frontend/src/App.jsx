import React, { useState, useEffect } from 'react';
import ChatList from './components/ChatList';
import ChatWindow from './components/ChatWindow';
import SendMessageBox from './components/SendMessageBox';

const App = () => {
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [reloadMessages, setReloadMessages] = useState(false);

  // Fetch chats
  useEffect(() => {
    fetch('/api/chats')
      .then(res => res.json())
      .then(data => setChats(data))
      .catch(err => console.error('Error fetching chats:', err));
  }, [reloadMessages]);

  const handleChatSelect = (wa_id) => {
    const chat = chats.find(c => c._id === wa_id);
    if (!chat) return;

    setSelectedChat({
      wa_id: chat._id,
      name: chat.name || 'Unknown',
    });
  };

  const handleMessageSent = () => {
    setReloadMessages(prev => !prev);
  };

  return (
    <div className="h-screen flex flex-col md:flex-row bg-gray-100">
      {/* Sidebar - Chat List */}
      <aside className="md:w-1/3 border-r border-gray-300 overflow-y-auto bg-white shadow-lg">
        <ChatList
          chats={chats}
          onSelect={handleChatSelect}
          selectedChat={selectedChat?.wa_id}
        />
      </aside>

      {/* Main Chat Area */}
      <main className="flex flex-col flex-1 bg-white">
        <ChatWindow
          selectedChat={selectedChat?.wa_id}
          reloadTrigger={reloadMessages}
        />
        {selectedChat && (
          <SendMessageBox
            wa_id={selectedChat.wa_id}
            name={selectedChat.name}
            onMessageSent={handleMessageSent}
          />
        )}
      </main>
    </div>
  );
};

export default App;
