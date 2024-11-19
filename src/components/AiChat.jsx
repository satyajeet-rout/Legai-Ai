import { useState } from 'react';
import { 
  Send, 
  User, 
  Bot, 
  Plus, 
  Settings, 
  Moon,
  Sun,
  MessageSquare,
  ChevronLeft,
  Menu,
  Pencil,
  Check,
  X,
  Trash2
} from 'lucide-react';

const ChatInterface = () => {
  const [messages, setMessages] = useState({
    1: [{ role: 'assistant', content: 'Hello! How can I help you today?' }],
    2: [
      { role: 'user', content: 'What is machine learning?' },
      { role: 'assistant', content: 'Machine learning is a branch of artificial intelligence...' }
    ],
    3: [
      { role: 'user', content: 'List some project ideas' },
      { role: 'assistant', content: 'Here are some project ideas you could work on...' }
    ]
  });
  
  const [input, setInput] = useState('');
  const [conversations, setConversations] = useState([
    { id: 1, title: 'Current Chat', active: true },
    { id: 2, title: 'ML Discussion', active: false },
    { id: 3, title: 'Project Ideas', active: false },
  ]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  const activeConversation = conversations.find(conv => conv.active)?.id || 1;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      const newMessage = { role: 'user', content: input.trim() };
      setMessages(prev => ({
        ...prev,
        [activeConversation]: [...(prev[activeConversation] || []), newMessage]
      }));
      
      setTimeout(() => {
        const aiResponse = { 
          role: 'assistant', 
          content: "This is a simulated response. Connect to your AI backend to get real responses."
        };
        setMessages(prev => ({
          ...prev,
          [activeConversation]: [...(prev[activeConversation] || []), aiResponse]
        }));
      }, 1000);
      
      setInput('');
    }
  };

  const startNewChat = () => {
    const newId = Math.max(...conversations.map(c => c.id)) + 1;
    const newChat = {
      id: newId,
      title: `New Chat ${newId}`,
      active: true
    };
    
    setConversations(prev => 
      prev.map(chat => ({ ...chat, active: false })).concat(newChat)
    );
    
    setMessages(prev => ({
      ...prev,
      [newId]: [{ role: 'assistant', content: 'Hello! How can I help you today?' }]
    }));
  };

  const switchConversation = (id) => {
    if (editingId || deleteConfirmId) return;
    setConversations(prev =>
      prev.map(chat => ({
        ...chat,
        active: chat.id === id
      }))
    );
  };

  const startEditing = (chat) => {
    setEditingId(chat.id);
    setEditTitle(chat.title);
  };

  const saveTitle = () => {
    if (editTitle.trim()) {
      setConversations(prev =>
        prev.map(chat => 
          chat.id === editingId
            ? { ...chat, title: editTitle.trim() }
            : chat
        )
      );
    }
    setEditingId(null);
    setEditTitle('');
  };

  const confirmDelete = (id) => {
    setDeleteConfirmId(id);
  };

  const handleDelete = (id) => {
    // If it's the last conversation, create a new one first
    if (conversations.length === 1) {
      startNewChat();
    } 
    // If deleting active conversation, activate the previous one
    else if (conversations.find(c => c.id === id)?.active) {
      const index = conversations.findIndex(c => c.id === id);
      const newActiveId = conversations[index - 1]?.id || conversations[index + 1]?.id;
      setConversations(prev =>
        prev.map(chat => ({
          ...chat,
          active: chat.id === newActiveId
        }))
      );
    }
    
    // Remove the conversation and its messages
    setConversations(prev => prev.filter(chat => chat.id !== id));
    setMessages(prev => {
      const newMessages = { ...prev };
      delete newMessages[id];
      return newMessages;
    });
    
    setDeleteConfirmId(null);
  };

  return (
    <div className={`flex h-screen ${isDarkMode ? 'dark bg-gray-900' : 'bg-white'}`}>
      {/* Sidebar */}
      <div className={`
        ${isSidebarOpen ? 'w-64' : 'w-0'} 
        transition-all duration-300 
        border-r 
        ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}
      `}>
        {isSidebarOpen && (
          <div className="h-full flex flex-col">
            <button 
              onClick={startNewChat}
              className="flex items-center gap-2 m-4 p-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
            >
              <Plus size={20} />
              New Chat
            </button>

            <div className="flex-1 overflow-y-auto">
              {conversations.map(chat => (
                <div 
                  key={chat.id}
                  onClick={() => deleteConfirmId !== chat.id && switchConversation(chat.id)}
                  className={`
                    group flex items-center gap-2 p-3 cursor-pointer
                    ${chat.active ? 
                      (isDarkMode ? 'bg-gray-700' : 'bg-gray-200') : 
                      'hover:bg-gray-100 dark:hover:bg-gray-700'
                    }
                    ${isDarkMode ? 'text-white' : 'text-gray-700'}
                  `}
                >
                  <MessageSquare size={18} />
                  {editingId === chat.id ? (
                    <div className="flex items-center gap-2 flex-1">
                      <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        className={`
                          flex-1 px-2 py-1 rounded
                          ${isDarkMode ? 'bg-gray-600 text-white' : 'bg-white text-gray-900'}
                        `}
                        autoFocus
                      />
                      <button 
                        onClick={saveTitle}
                        className="p-1 hover:bg-gray-600 rounded"
                      >
                        <Check size={16} className="text-green-500" />
                      </button>
                      <button 
                        onClick={() => setEditingId(null)}
                        className="p-1 hover:bg-gray-600 rounded"
                      >
                        <X size={16} className="text-red-500" />
                      </button>
                    </div>
                  ) : deleteConfirmId === chat.id ? (
                    <div className="flex items-center gap-2 flex-1">
                      <span className="text-sm text-red-500">Delete this chat?</span>
                      <button 
                        onClick={() => handleDelete(chat.id)}
                        className="p-1 hover:bg-gray-600 rounded"
                      >
                        <Check size={16} className="text-green-500" />
                      </button>
                      <button 
                        onClick={() => setDeleteConfirmId(null)}
                        className="p-1 hover:bg-gray-600 rounded"
                      >
                        <X size={16} className="text-red-500" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between flex-1">
                      <span className="truncate">{chat.title}</span>
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            startEditing(chat);
                          }}
                          className="p-1 hover:bg-gray-300 dark:hover:bg-gray-600 rounded"
                        >
                          <Pencil size={14} />
                        </button>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            confirmDelete(chat.id);
                          }}
                          className="p-1 hover:bg-gray-300 dark:hover:bg-gray-600 rounded text-red-500"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className={`p-4 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <button 
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`
                  flex items-center gap-2 p-2 rounded-lg w-full
                  ${isDarkMode ? 'text-white hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}
                `}
              >
                {isDarkMode ? <Moon size={18} /> : <Sun size={18} />}
                {isDarkMode ? 'Dark Mode' : 'Light Mode'}
              </button>
              <button 
                className={`
                  flex items-center gap-2 p-2 rounded-lg w-full mt-2
                  ${isDarkMode ? 'text-white hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}
                `}
              >
                <Settings size={18} />
                Settings
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        <div className={`
          flex items-center gap-2 p-4 border-b
          ${isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-200'}
        `}>
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            {isSidebarOpen ? <ChevronLeft size={24} /> : <Menu size={24} />}
          </button>
          <h1 className="text-xl font-semibold">
            {conversations.find(c => c.active)?.title || 'AI Chat'}
          </h1>
        </div>

        <div className={`
          flex-1 overflow-y-auto p-4 space-y-4
          ${isDarkMode ? 'bg-gray-900' : 'bg-white'}
        `}>
          {messages[activeConversation]?.map((message, index) => (
            <div 
              key={index} 
              className={`flex items-start gap-3 ${
                message.role === 'user' ? 'flex-row-reverse' : ''
              }`}
            >
              <div className={`
                w-8 h-8 rounded-full flex items-center justify-center
                ${message.role === 'user' ? 
                  'bg-blue-100' : 
                  (isDarkMode ? 'bg-purple-900' : 'bg-purple-100')
                }
              `}>
                {message.role === 'user' ? 
                  <User className="w-5 h-5 text-blue-600" /> : 
                  <Bot className="w-5 h-5 text-purple-600" />
                }
              </div>

              <div className={`
                max-w-[80%] rounded-lg p-3
                ${message.role === 'user' 
                  ? 'bg-blue-500 text-white' 
                  : isDarkMode 
                    ? 'bg-gray-800 text-white'
                    : 'bg-gray-100 text-gray-900'
                }
              `}>
                {message.content}
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className={`
          border-t p-4
          ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}
        `}>
          <div className="flex gap-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className={`
                flex-1 p-2 rounded-lg
                ${isDarkMode 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                  : 'bg-white border-gray-300 text-gray-900'
                }
                border focus:outline-none focus:ring-2 focus:ring-blue-500
              `}
            />
            <button 
              type="submit"
              disabled={!input.trim()}
              className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatInterface;