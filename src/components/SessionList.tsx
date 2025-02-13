import React from 'react';
import { MessageSquare, LogOut } from 'lucide-react';
import { useChatStore } from '../store/chatStore';

export function SessionList() {
  const { sessions, currentSessionId, createSession, setCurrentSession, logout } = useChatStore();

  return (
    <div className="w-72 border-r border-gray-300 bg-black flex flex-col shadow-md">
      {/* Header */}
      <div className="p-5 border-b border-gray-300">
        <h1 className="text-2xl font-bold text-white font-[Poppins]">Ayna Chat</h1>
      </div>

      {/* Chat Sessions */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {sessions.map((session) => (
          <button
            key={session.id}
            onClick={() => setCurrentSession(session.id)}
            className={`w-full p-3 text-left rounded-lg font-medium transition-all duration-300 ${
              session.id === currentSessionId
                ? 'bg-gradient-to-r from-black text-white shadow-md'
                : 'hover:bg-gray-100 text-gray-100'
            }`}
          >
            🗨️ Chat {new Date(session.createdAt).toLocaleDateString()}
          </button>
        ))}
      </div>

      {/* Buttons at Bottom */}
      <div className="p-4 border-t border-gray-300 flex flex-col gap-3 mt-auto">
        <button
          onClick={createSession}
          className="w-full p-2 text-white border-white bg-gradient-to-r from-gray-600 to-gray-400 rounded-full shadow-md flex items-center justify-center gap-2 transition-all duration-300 hover:scale-105 hover:shadow-lg"
        >
          <MessageSquare size={20} />
          New Chat
        </button>
        <button
          onClick={logout}
          className="w-full p-2 text-white border border-white rounded-full flex items-center justify-center gap-2 transition-all duration-300 hover:bg-gray-800 hover:scale-105"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </div>
  );
}
