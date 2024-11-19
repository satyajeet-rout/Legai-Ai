
import { useState, useRef, useEffect } from 'react';
import { 
    Sun, Moon, HelpCircle,
    // User,
    Bot, ThumbsUp, 
  ThumbsDown, RotateCcw, Send, Loader, Link, ExternalLink 
} from 'lucide-react';

const DocChat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      setMessages(prev => [...prev, { 
        role: 'user', 
        content: input.trim(),
        id: prev.length + 1
      }]);
      setLoading(true);
      setInput('');

      setTimeout(() => {
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: {
            title: "Raj Rani And Others vs State Of Punjab And Others on 6 May, 2019",
            doc_link: "https://indiankanoon.org/doc/152322669/",
            publish_date: "2019-05-06",
            author: "R Sehrawat",
            headline: "Protection of life and personal liberty: No person shall be deprived of his life or personal liberty except according to procedure established.",
            resources: [
              { type: 'documentation', title: 'Official Documentation', link: 'https://indiankanoon.org/doc/152322669/' },
              { type: 'documentation', title: 'Official Documentation', link: 'https://indiankanoon.org/doc/152322669/' },
            ],
            additionalInfo: [
              "Component-Based Architecture",
              "Virtual DOM for Performance",
              "Rich Ecosystem and Community"
            ]
          },
          id: prev.length + 1
        }]);
        setLoading(false);
      }, 1000);
    }
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const isEmpty = messages.length === 0 && !loading;

  const renderAssistantContent = (content) => {
    if (typeof content === 'string') return content;

    return (
      <div className={`space-y-4 border rounded-md p-3 ${
        isDarkMode ? ' border-transparent' : 'border-gray-200 bg-gray-100'
      }`}>
        <p><span className="font-bold">Title: </span>{content.title}</p>
        <p><span className="font-bold">Publish Date: </span>{content.publish_date}</p>
        <p><span className="font-bold">Author: </span>{content.author}</p>
        <p><span className="font-bold">Headline: </span>{content.headline}</p>

        {content.resources && (
          <div className="space-y-2">
            <p className="font-semibold flex items-center gap-2">
              <Link size={16} />
              Resources:
            </p>
            <div className="space-y-2">
              {content.resources.map((resource, index) => (
                <a
                  key={index}
                  href={resource.link}
                  className={`flex items-center gap-2 ${
                    isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'
                  }`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink size={14} />
                  {resource.title}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div 
      className="flex flex-col h-screen"
      style={{ 
        backgroundColor: isDarkMode ? '#212121' : '#ffffff',
        color: isDarkMode ? 'white' : 'black'
      }}
    >
      {/* Top Nav */}
      <nav 
        className={`border-b p-2 flex items-center justify-end sticky top-0 z-20 ${
          isDarkMode ? 'border-gray-700' : 'border-gray-200'
        }`}
        style={{ backgroundColor: isDarkMode ? '#212121' : '#ffffff' }}
      >
        <div className="flex items-center gap-2">
          <button 
            onClick={toggleTheme}
            className={`p-2 rounded-md ${
              isDarkMode ? 'hover:bg-gray-800 text-white' : 'hover:bg-gray-100 text-gray-800'
            }`}
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button className={`p-2 rounded-md ${
            isDarkMode ? 'hover:bg-gray-800 text-white' : 'hover:bg-gray-100 text-gray-800'
          }`}>
            <HelpCircle size={20} />
          </button>
        </div>
      </nav>

      {/* Main Container */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {isEmpty ? (
          <div className="flex-1 flex flex-col justify-center items-center p-4">
            <h1 className={`text-4xl font-bold text-center mb-8 ${
              isDarkMode ? 'text-white' : 'text-gray-800'
            }`}>
              ChatGPT
            </h1>
            <div className="w-full max-w-3xl">
              <form onSubmit={handleSubmit} className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Send a message..."
                  className={`w-full p-4 pr-12 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                    isDarkMode 
                      ? 'border-gray-600 bg-gray-800 text-white placeholder-gray-400' 
                      : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'
                  }`}
                />
                <button 
                  type="submit"
                  disabled={!input.trim() || loading}
                  className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 disabled:opacity-50 ${
                    isDarkMode
                      ? 'text-gray-400 hover:text-gray-200'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Send size={20} />
                </button>
              </form>
            </div>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto pb-32">
              {messages.map((message) => (
                <div key={message.id}>
                  <div className="max-w-3xl mx-auto p-4">
                    {message.role === 'assistant' ? (
                      <div className="flex gap-4">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white shrink-0 ${
                          isDarkMode ? 'bg-gray-700' : 'bg-gray-600'
                        }`}>
                          <Bot size={16} />
                          <img src="https://infrahive-ai-search.vercel.app/Logo%20(Digest).png" />
                        </div>
                        <div className="flex-1 space-y-2">
                          {/* <p className="font-semibold">Assistant</p> */}
                          <div className={isDarkMode ? 'text-white' : 'text-gray-900'}>
                            {renderAssistantContent(message.content)}
                          </div>
                          <div className="flex items-center gap-2 mt-2">
                            <button className={`p-1 rounded ${
                              isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
                            }`}>
                              <ThumbsUp size={16} />
                            </button>
                            <button className={`p-1 rounded ${
                              isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
                            }`}>
                              <ThumbsDown size={16} />
                            </button>
                            <button className={`p-1 rounded ${
                              isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
                            }`}>
                              <RotateCcw size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex justify-end gap-4">
                        <div className="max-w-[85%] space-y-2">
                          {/* <p className="font-semibold text-right">You</p> */}
                          <div className="bg-[#303030] text-white p-3 rounded-full">
                            {message.content}
                          </div>
                        </div>
                        {/* <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-white shrink-0">
                          <User size={16} />
                        </div> */}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {loading && (
                <div className={`border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                  <div className="max-w-3xl mx-auto p-4 flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white">
                      <Bot size={16} />
                    </div>
                    <div className="flex items-center">
                      <Loader className="animate-spin" size={16} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Fixed Input Area */}
            <div 
              className={`fixed bottom-0 left-20 right-0 border-t p-4 z-[0] ${
                isDarkMode ? 'border-gray-700' : 'border-gray-200'
              }`}
              style={{ backgroundColor: isDarkMode ? '#212121' : '#ffffff' }}
            >
              <div className="max-w-3xl mx-auto">
                <form onSubmit={handleSubmit} className="relative">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Send a message..."
                    className={`w-full p-4 pr-12 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                      isDarkMode 
                        ? 'border-gray-600 bg-gray-800 text-white placeholder-gray-400' 
                        : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'
                    }`}
                  />
                  <button 
                    type="submit"
                    disabled={!input.trim() || loading}
                    className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 disabled:opacity-50 ${
                      isDarkMode
                        ? 'text-gray-400 hover:text-gray-200'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <Send size={20} />
                  </button>
                </form>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DocChat;