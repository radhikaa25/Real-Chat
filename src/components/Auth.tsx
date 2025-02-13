import React, { useState } from 'react';
import { useChatStore } from '../store/chatStore';

export function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, signup } = useChatStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await signup(email, username, password);
      }
    } catch (err) {
      setError('Authentication failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-white">
      <div className="max-w-md w-full p-8 bg-gray-900  shadow-xl">
        <div className="flex items-center justify-center mb-8">
          <h1 className="text-4xl font-Roboto text-white ml-3">Ayna Real-Chat</h1>
        </div>
        
        <div className="flex justify-center mb-8">
          <button
            onClick={() => setIsLogin(true)}
            className={`px-6 py-2 rounded-l-lg ${
              isLogin
                ? 'bg-gradient-to-r from-gray-500 to--600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`px-6 py-2 rounded-r-lg ${
              !isLogin
                ? 'bg-gradient-to-r from-gray-500 to--600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Sign Up
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-white mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
              required
            />
          </div>

          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-white mb-1">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
                required
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-white mb-1 ">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-gray-800 to-gray-500 text-white rounded-lg hover:bg-black- focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
          >
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>
      </div>
    </div>
  );
}