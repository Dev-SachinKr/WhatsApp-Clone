import React from "react";

const ChatList = ({ chats, onSelect, selectedChat }) => {
  return (
    <div className="flex flex-col h-full bg-white border-r border-gray-200">
      {/* Header */}
      <div className="sticky top-0 bg-white z-20 flex items-center justify-between px-5 py-3 border-b border-gray-200">
        <h1 className="text-xl font-semibold text-gray-900 select-none">Chats</h1>
        {/* Could add "New Chat" icon */}
      </div>

      {/* Chats container */}
      {chats.length === 0 ? (
        <p className="p-4 text-center text-gray-400 select-none">No chats available</p>
      ) : (
        <ul className="overflow-y-auto flex-1">
          {chats.map((chat) => {
            const isSelected = selectedChat === chat._id;
            return (
              <li
                key={chat._id}
                onClick={() => onSelect(chat._id)}
                className={`flex items-center px-5 py-3 cursor-pointer border-b border-gray-100
                  ${isSelected ? "bg-green-50" : "hover:bg-gray-100"}
                  transition-colors duration-200`}
              >
                {/* Profile circle placeholder */}
                <div
                  className="flex-shrink-0 h-12 w-12 rounded-full bg-green-400 flex items-center justify-center text-white font-bold text-lg"
                  title={chat.name || "Unknown"}
                >
                  {(chat.name || "U")[0].toUpperCase()}
                </div>

                {/* Chat info */}
                <div className="ml-4 flex-1 overflow-hidden">
                  <div
                    className={`flex justify-between items-center ${
                      isSelected ? "text-green-700" : "text-gray-900"
                    }`}
                  >
                    <h2 className="font-semibold text-base truncate">
                      {chat.name || "Unknown"}
                    </h2>
                    <span className="text-xs text-gray-500 select-none whitespace-nowrap ml-2">
                      {new Date(chat.lastTimestamp * 1000).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>

                  <p
                    className={`text-sm truncate mt-0.5 ${
                      isSelected ? "text-green-600" : "text-gray-600"
                    }`}
                  >
                    {chat.lastMessage || "No messages yet"}
                  </p>
                </div>

                {/* Unread badge example, optional */}
                {chat.unreadCount > 0 && (
                  <span className="ml-3 inline-flex items-center justify-center px-2 py-0.5 rounded-full bg-green-600 text-white text-xs font-semibold select-none">
                    {chat.unreadCount}
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default ChatList;
