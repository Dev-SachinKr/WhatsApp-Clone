import React, { useEffect, useState, useRef } from 'react';

const ChatWindow = ({ selectedChat, reloadTrigger }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (!selectedChat) return;

    setLoading(true);
    fetch(`/api/messages/${selectedChat}`)
      .then(res => res.json())
      .then(data => {
        setMessages(data);
        setLoading(false);
        setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
      })
      .catch(err => {
        console.error('Error fetching messages:', err);
        setLoading(false);
      });
  }, [selectedChat, reloadTrigger]);

  const renderStatusIcon = (status) => {
    const commonClasses = 'w-4 h-4';
    switch (status) {
      case 'sent':
        return (
          <svg
            className={`${commonClasses} text-gray-500`}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M5 13l4 4L19 7" />
          </svg>
        );
      case 'delivered':
        return (
          <svg
            className={`${commonClasses} text-gray-500`}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M3 13l4 4L17 7" />
            <path d="M9 13l4 4L21 7" />
          </svg>
        );
      case 'read':
        return (
          <svg
            className={`${commonClasses} text-blue-500`}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M3 13l4 4L17 7" />
            <path d="M9 13l4 4L21 7" />
          </svg>
        );
      default:
        return null;
    }
  };

  if (!selectedChat) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-500 select-none">
        Select a chat to start messaging
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 border-l border-gray-300 bg-white">
      <div className="p-4 border-b border-gray-300 flex items-center justify-between sticky top-0 bg-white z-10">
        <h2 className="font-semibold text-lg truncate">{selectedChat}</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4 bg-gray-50 flex flex-col space-y-3 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        {loading ? (
          <p className="text-center text-gray-500">Loading messages...</p>
        ) : messages.length === 0 ? (
          <p className="text-center text-gray-400 italic">No messages found.</p>
        ) : (
          messages.map(msg => (
            <div
              key={msg._id}
              className={`max-w-[70%] p-3 rounded-lg break-words
                ${msg.fromMe ? 'bg-green-200 self-end text-right' : 'bg-white self-start text-left'}
                shadow-sm`}
            >
              <p className="whitespace-pre-wrap text-gray-900">{msg.text}</p>
              <small className="text-gray-500 text-xs flex items-center justify-end gap-1 mt-1">
                {new Date(msg.timestamp * 1000).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
                {msg.fromMe && <span className="ml-1">{renderStatusIcon(msg.status)}</span>}
              </small>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default ChatWindow;
