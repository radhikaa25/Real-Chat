import React, { useEffect, useRef } from 'react';
import { useChatStore } from '../store/chatStore';

export function ChatMessages() {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Get current session and messages from Zustand store
  const { currentSessionId, sessions } = useChatStore((state) => ({
    currentSessionId: state.currentSessionId,
    sessions: state.sessions,
  }));

  const currentSession = sessions.find((s) => s.id === currentSessionId);
  const messages = currentSession?.messages || [];

  // Scroll to the latest message
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]); // Scroll when messages update

  // Debugging: Log session details
  console.log("Current Session ID:", currentSessionId);
  console.log("Messages:", messages);

  return (
    <div 
      className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-br from-black via-gray-600 to-black"
      style={{ maxHeight: '80vh' }} // Restricts height to prevent excessive scrolling
    >
      {messages.length === 0 ? (
        <p className="text-center text-gray-300">No messages yet. Start the conversation!</p>
      ) : (
        messages.map((message) => (
          <div
            key={message.id}
            className={`flex items-end ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`relative max-w-[70%] px-4 py-3 rounded-xl shadow-md ${
                message.sender === 'user'
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-900 shadow-sm'
              }`}
            >
              <p className="text-sm">{message.content}</p>
              <span 
                className="absolute bottom-0 right-2 text-xs opacity-70 mt-1"
                style={{ fontSize: '0.7rem' }}
              >
                {new Date(message.timestamp).toLocaleTimeString()}
              </span>
            </div>
          </div>
        ))
      )}
      <div ref={messagesEndRef} />
    </div>
  );
}
