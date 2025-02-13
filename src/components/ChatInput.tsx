import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { useChatStore } from '../store/chatStore';

export function ChatInput() {
  const [message, setMessage] = useState('');
  const sendMessage = useChatStore((state) => state.sendMessage);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    sendMessage(message);
    setMessage('');
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="p-4 border-t border-gray-300 bg-white shadow-lg"
    >
      <div className="flex items-center gap-3">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 px-4 py-3 text-gray-800 placeholder-gray-800 bg-gray-300 border border-black rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-black font-[Poppins] text-[16px]"
        />
        <button
          type="submit"
          className="p-3 transition-all duration-300 ease-in-out bg-black text-white rounded-full shadow-md hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-black"
        >
          <Send size={22} />
        </button>
      </div>
    </form>
  );
}
