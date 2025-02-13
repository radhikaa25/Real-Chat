import { create } from 'zustand';
import type { Message, User, ChatSession, AuthUser } from '../types/chat';

interface ChatStore {
  user: AuthUser | null;
  sessions: ChatSession[];
  currentSessionId: string | null;
  connect: () => void;
  disconnect: () => void;
  sendMessage: (content: string) => void;
  createSession: () => void;
  setCurrentSession: (sessionId: string) => void;
  addMessage: (message: Message) => void;
  logout: () => void;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, username: string, password: string) => Promise<void>;
}

export const useChatStore = create<ChatStore>((set, get) => ({
  user: JSON.parse(localStorage.getItem('auth_user') || 'null'),
  sessions: JSON.parse(localStorage.getItem('chat_sessions') || '[]'),
  currentSessionId: null,

  connect: () => {
    const storedSessions = localStorage.getItem('chat_sessions');
    if (storedSessions) set({ sessions: JSON.parse(storedSessions) });

    const storedUser = localStorage.getItem('auth_user');
    if (storedUser) set({ user: JSON.parse(storedUser) });
  },

  disconnect: () => {
    const { sessions } = get();
    localStorage.setItem('chat_sessions', JSON.stringify(sessions));
  },

  sendMessage: (content: string) => {
    const { currentSessionId, addMessage } = get();
    if (!currentSessionId) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      content,
      sender: 'user',
      timestamp: Date.now(),
    };

    // Add user message immediately
    addMessage(userMessage);

    // Simulate server response with a 500ms delay
    setTimeout(() => {
      const serverMessage: Message = {
        id: crypto.randomUUID(),
        content: `Echo: ${content}`,
        sender: 'server',
        timestamp: Date.now(),
      };
      // Add server message
      addMessage(serverMessage);
    }, 500);
  },

  createSession: () => {
    const newSession: ChatSession = {
      id: crypto.randomUUID(),
      messages: [],
      createdAt: Date.now(),
    };

    set((state) => {
      const updatedSessions = [...state.sessions, newSession];
      localStorage.setItem('chat_sessions', JSON.stringify(updatedSessions));
      return {
        sessions: updatedSessions,
        currentSessionId: newSession.id,
      };
    });
  },

  setCurrentSession: (sessionId: string) => {
    set({ currentSessionId: sessionId });
  },

  addMessage: (message: Message) => {
    set((state) => {
      const sessionIndex = state.sessions.findIndex(
        (s) => s.id === state.currentSessionId
      );

      if (sessionIndex === -1) return state;

      const updatedSessions = [...state.sessions];
      updatedSessions[sessionIndex] = {
        ...updatedSessions[sessionIndex],
        messages: [...updatedSessions[sessionIndex].messages, message],
      };

      // Update state with new messages
      localStorage.setItem('chat_sessions', JSON.stringify(updatedSessions));
      return { sessions: updatedSessions };
    });
  },

  logout: () => {
    localStorage.removeItem('auth_user');
    set({ user: null, sessions: [], currentSessionId: null });
  },

  login: async (email: string, password: string) => {
    try {
      const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
      const user = users.find((u) => u.email === email && u.password === password);

      if (!user) throw new Error('Invalid email or password');

      const authUser: AuthUser = {
        email: user.email,
        username: user.username,
        isAuthenticated: true,
      };

      localStorage.setItem('auth_user', JSON.stringify(authUser));
      set({ user: authUser });
    } catch (error) {
      console.error(error);
      throw new Error('Login failed. Please try again.');
    }
  },

  signup: async (email: string, username: string, password: string) => {
    try {
      const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');

      if (users.some((u) => u.email === email)) {
        throw new Error('Email already exists');
      }

      const newUser: User = { email, username, password };
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));

      const authUser: AuthUser = {
        email,
        username,
        isAuthenticated: true,
      };

      localStorage.setItem('auth_user', JSON.stringify(authUser));
      set({ user: authUser });
    } catch (error) {
      console.error(error);
      throw new Error('Signup failed. Please try again.');
    }
  },
}));
