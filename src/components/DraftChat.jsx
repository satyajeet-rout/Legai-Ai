
// import { useState, useRef, useEffect } from 'react';
// import { 
//     Sun, Moon, HelpCircle,
//     // User,
//     Bot, ThumbsUp, 
//   ThumbsDown, RotateCcw, Send, Loader, Link, ExternalLink 
// } from 'lucide-react';

// const DraftChat = () => {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [isDarkMode, setIsDarkMode] = useState(true);
//   const messagesEndRef = useRef(null);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages, loading]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (input.trim()) {
//       setMessages(prev => [...prev, { 
//         role: 'user', 
//         content: input.trim(),
//         id: prev.length + 1
//       }]);
//       setLoading(true);
//       setInput('');

//       setTimeout(() => {
//         setMessages(prev => [...prev, { 
//           role: 'assistant', 
//           content: {
//             title: "Raj Rani And Others vs State Of Punjab And Others on 6 May, 2019",
//             doc_link: "https://indiankanoon.org/doc/152322669/",
//             publish_date: "2019-05-06",
//             author: "R Sehrawat",
//             headline: "Protection of life and personal liberty: No person shall be deprived of his life or personal liberty except according to procedure established.",
//             resources: [
//               { type: 'documentation', title: 'Official Documentation', link: 'https://indiankanoon.org/doc/152322669/' },
//               { type: 'documentation', title: 'Official Documentation', link: 'https://indiankanoon.org/doc/152322669/' },
//             ],
//             additionalInfo: [
//               "Component-Based Architecture",
//               "Virtual DOM for Performance",
//               "Rich Ecosystem and Community"
//             ]
//           },
//           id: prev.length + 1
//         }]);
//         setLoading(false);
//       }, 1000);
//     }
//   };

//   const toggleTheme = () => {
//     setIsDarkMode(!isDarkMode);
//   };

//   const isEmpty = messages.length === 0 && !loading;

//   const renderAssistantContent = (content) => {
//     if (typeof content === 'string') return content;

//     return (
//       <div className={`space-y-4 border rounded-md p-3 ${
//         isDarkMode ? ' border-transparent' : 'border-gray-200 bg-gray-100'
//       }`}>
//         <p><span className="font-bold">Title: </span>{content.title}</p>
//         <p><span className="font-bold">Publish Date: </span>{content.publish_date}</p>
//         <p><span className="font-bold">Author: </span>{content.author}</p>
//         <p><span className="font-bold">Headline: </span>{content.headline}</p>

//         {content.resources && (
//           <div className="space-y-2">
//             <p className="font-semibold flex items-center gap-2">
//               <Link size={16} />
//               Resources:
//             </p>
//             <div className="space-y-2">
//               {content.resources.map((resource, index) => (
//                 <a
//                   key={index}
//                   href={resource.link}
//                   className={`flex items-center gap-2 ${
//                     isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'
//                   }`}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                 >
//                   <ExternalLink size={14} />
//                   {resource.title}
//                 </a>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     );
//   };

//   return (
//     <div 
//       className="flex flex-col h-screen"
//       style={{ 
//         backgroundColor: isDarkMode ? '#212121' : '#ffffff',
//         color: isDarkMode ? 'white' : 'black'
//       }}
//     >
//       {/* Top Nav */}
//       <nav 
//         className={`border-b p-2 flex items-center justify-end sticky top-0 z-20 ${
//           isDarkMode ? 'border-gray-700' : 'border-gray-200'
//         }`}
//         style={{ backgroundColor: isDarkMode ? '#212121' : '#ffffff' }}
//       >
//         <div className="flex items-center gap-2">
//           <button 
//             onClick={toggleTheme}
//             className={`p-2 rounded-md ${
//               isDarkMode ? 'hover:bg-gray-800 text-white' : 'hover:bg-gray-100 text-gray-800'
//             }`}
//           >
//             {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
//           </button>
//           <button className={`p-2 rounded-md ${
//             isDarkMode ? 'hover:bg-gray-800 text-white' : 'hover:bg-gray-100 text-gray-800'
//           }`}>
//             <HelpCircle size={20} />
//           </button>
//         </div>
//       </nav>

//       {/* Main Container */}
//       <div className="flex-1 flex flex-col overflow-hidden">
//         {isEmpty ? (
//           <div className="flex-1 flex flex-col justify-center items-center p-4">
//             <h1 className={`text-4xl font-bold text-center mb-8 ${
//               isDarkMode ? 'text-white' : 'text-gray-800'
//             }`}>
//               ChatGPT
//             </h1>
//             <div className="w-full max-w-3xl">
//               <form onSubmit={handleSubmit} className="relative">
//                 <input
//                   type="text"
//                   value={input}
//                   onChange={(e) => setInput(e.target.value)}
//                   placeholder="Send a message..."
//                   className={`w-full p-4 pr-12 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-500 ${
//                     isDarkMode 
//                       ? 'border-gray-600 bg-gray-800 text-white placeholder-gray-400' 
//                       : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'
//                   }`}
//                 />
//                 <button 
//                   type="submit"
//                   disabled={!input.trim() || loading}
//                   className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 disabled:opacity-50 ${
//                     isDarkMode
//                       ? 'text-gray-400 hover:text-gray-200'
//                       : 'text-gray-500 hover:text-gray-700'
//                   }`}
//                 >
//                   <Send size={20} />
//                 </button>
//               </form>
//             </div>
//           </div>
//         ) : (
//           <>
//             <div className="flex-1 overflow-y-auto pb-32">
//               {messages.map((message) => (
//                 <div key={message.id}>
//                   <div className="max-w-3xl mx-auto p-4">
//                     {message.role === 'assistant' ? (
//                       <div className="flex gap-4">
//                         <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white shrink-0 ${
//                           isDarkMode ? 'bg-gray-700' : 'bg-gray-600'
//                         }`}>
//                           <Bot size={16} />
//                           <img src="https://infrahive-ai-search.vercel.app/Logo%20(Digest).png" />
//                         </div>
//                         <div className="flex-1 space-y-2">
//                           {/* <p className="font-semibold">Assistant</p> */}
//                           <div className={isDarkMode ? 'text-white' : 'text-gray-900'}>
//                             {renderAssistantContent(message.content)}
//                           </div>
//                           <div className="flex items-center gap-2 mt-2">
//                             <button className={`p-1 rounded ${
//                               isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
//                             }`}>
//                               <ThumbsUp size={16} />
//                             </button>
//                             <button className={`p-1 rounded ${
//                               isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
//                             }`}>
//                               <ThumbsDown size={16} />
//                             </button>
//                             <button className={`p-1 rounded ${
//                               isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
//                             }`}>
//                               <RotateCcw size={16} />
//                             </button>
//                           </div>
//                         </div>
//                       </div>
//                     ) : (
//                       <div className="flex justify-end gap-4">
//                         <div className="max-w-[85%] space-y-2">
//                           {/* <p className="font-semibold text-right">You</p> */}
//                           <div className="bg-[#303030] text-white p-3 rounded-full">
//                             {message.content}
//                           </div>
//                         </div>
//                         {/* <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-white shrink-0">
//                           <User size={16} />
//                         </div> */}
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               ))}
//               {loading && (
//                 <div className={`border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
//                   <div className="max-w-3xl mx-auto p-4 flex gap-4">
//                     <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white">
//                       <Bot size={16} />
//                     </div>
//                     <div className="flex items-center">
//                       <Loader className="animate-spin" size={16} />
//                     </div>
//                   </div>
//                 </div>
//               )}
//               <div ref={messagesEndRef} />
//             </div>

//             {/* Fixed Input Area */}
//             <div 
//               className={`fixed bottom-0 left-20 right-0 border-t p-4 z-[0] ${
//                 isDarkMode ? 'border-gray-700' : 'border-gray-200'
//               }`}
//               style={{ backgroundColor: isDarkMode ? '#212121' : '#ffffff' }}
//             >
//               <div className="max-w-3xl mx-auto">
//                 <form onSubmit={handleSubmit} className="relative">
//                   <input
//                     type="text"
//                     value={input}
//                     onChange={(e) => setInput(e.target.value)}
//                     placeholder="Send a message..."
//                     className={`w-full p-4 pr-12 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-500 ${
//                       isDarkMode 
                        // ? 'border-gray-600 bg-gray-800 text-white placeholder-gray-400'
//                         : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'
//                     }`}
//                   />
//                   <button 
//                     type="submit"
//                     disabled={!input.trim() || loading}
//                     className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 disabled:opacity-50 ${
//                       isDarkMode
//                         ? 'text-gray-400 hover:text-gray-200'
//                         : 'text-gray-500 hover:text-gray-700'
//                     }`}
//                   >
//                     <Send size={20} />
//                   </button>
//                 </form>
//               </div>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default DraftChat;

// import React, { useState, useRef, useEffect } from 'react';
// import { 
//   Sun, Moon, HelpCircle, Bot, ThumbsUp, 
//   ThumbsDown, RotateCcw, Send, Loader, Link, ExternalLink 
// } from 'lucide-react';

// const DraftChat = () => {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [isDarkMode, setIsDarkMode] = useState(true);
//   const [currentResources, setCurrentResources] = useState([]);
//   const messagesEndRef = useRef(null);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages, loading]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (input.trim()) {
//       setMessages(prev => [...prev, { 
//         role: 'user', 
//         content: input.trim(),
//         id: prev.length + 1
//       }]);
//       setLoading(true);
//       setInput('');
//       setCurrentResources([]); // Clear resources when user sends message

//       setTimeout(() => {
//         const response = {
//           role: 'assistant', 
//           content: {
//             title: "Raj Rani And Others vs State Of Punjab And Others on 6 May, 2019",
//             doc_link: "https://indiankanoon.org/doc/152322669/",
//             publish_date: "2019-05-06",
//             author: "R Sehrawat",
//             headline: "Protection of life and personal liberty: No person shall be deprived of his life or personal liberty except according to procedure established.",
//             resources: [
//               { type: 'documentation', title: 'Official Documentation', link: 'https://indiankanoon.org/doc/152322669/' },
//               { type: 'documentation', title: 'Official Documentation', link: 'https://indiankanoon.org/doc/152322669/' },
//             ],
//             additionalInfo: [
//               "Component-Based Architecture",
//               "Virtual DOM for Performance",
//               "Rich Ecosystem and Community"
//             ]
//           },
//           id: messages.length + 2
//         };
//         setMessages(prev => [...prev, response]);
//         setCurrentResources(response.content.resources);
//         setLoading(false);
//       }, 1000);
//     }
//   };

//   const toggleTheme = () => {
//     setIsDarkMode(!isDarkMode);
//   };

//   const isEmpty = messages.length === 0 && !loading;

//   const renderAssistantContent = (content) => {
//     if (typeof content === 'string') return content;

//     return (
//       <div className={`space-y-4 border rounded-md p-3 ${
//         isDarkMode ? 'border-transparent' : 'border-gray-200 bg-gray-100'
//       }`}>
//         <p><span className="font-bold">Title: </span>{content.title}</p>
//         <p><span className="font-bold">Publish Date: </span>{content.publish_date}</p>
//         <p><span className="font-bold">Author: </span>{content.author}</p>
//         <p><span className="font-bold">Headline: </span>{content.headline}</p>
//       </div>
//     );
//   };

//   return (
//     <div className="flex h-screen" style={{ backgroundColor: isDarkMode ? '#212121' : '#ffffff' }}>
//       {/* Main Chat Column */}
//       <div className="flex-1 flex flex-col relative">
//         {/* Top Nav */}
//         <nav 
//           className={`border-b p-2 flex items-center justify-end sticky top-0 z-20 ${
//             isDarkMode ? 'border-gray-700' : 'border-gray-200'
//           }`}
//           style={{ backgroundColor: isDarkMode ? '#212121' : '#ffffff' }}
//         >
//           <div className="flex items-center gap-2">
//             <button 
//               onClick={toggleTheme}
//               className={`p-2 rounded-md ${
//                 isDarkMode ? 'hover:bg-gray-800 text-white' : 'hover:bg-gray-100 text-gray-800'
//               }`}
//             >
//               {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
//             </button>
//             <button className={`p-2 rounded-md ${
//               isDarkMode ? 'hover:bg-gray-800 text-white' : 'hover:bg-gray-100 text-gray-800'
//             }`}>
//               <HelpCircle size={20} />
//             </button>
//           </div>
//         </nav>

//         {/* Chat Content */}
//         <div className="flex-1 overflow-y-auto">
//           {isEmpty ? (
//             <div className="h-full flex flex-col justify-center items-center p-4">
//               <h1 className={`text-4xl font-bold text-center mb-8 ${
//                 isDarkMode ? 'text-white' : 'text-gray-800'
//               }`}>
//                 ChatGPT
//               </h1>
//               <div className="w-full max-w-2xl">
//                 <form onSubmit={handleSubmit} className="relative">
//                   <input
//                     type="text"
//                     value={input}
//                     onChange={(e) => setInput(e.target.value)}
//                     placeholder="Send a message..."
//                     className={`w-full p-4 pr-12 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-500 ${
//                       isDarkMode 
//                         ? 'border-gray-600 bg-gray-800 text-white placeholder-gray-400' 
//                         : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'
//                     }`}
//                   />
//                   <button 
//                     type="submit"
//                     disabled={!input.trim() || loading}
//                     className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 disabled:opacity-50 ${
//                       isDarkMode
//                         ? 'text-gray-400 hover:text-gray-200'
//                         : 'text-gray-500 hover:text-gray-700'
//                     }`}
//                   >
//                     <Send size={20} />
//                   </button>
//                 </form>
//               </div>
//             </div>
//           ) : (
//             <>
//               <div className="pb-32">
//                 {messages.map((message) => (
//                   <div key={message.id}>
//                     <div className="max-w-2xl mx-auto p-4">
//                       {message.role === 'assistant' ? (
//                         <div className="flex gap-4">
//                           <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white shrink-0 ${
//                             isDarkMode ? 'bg-gray-700' : 'bg-gray-600'
//                           }`}>
//                             <Bot size={16} />
//                             <img src="https://infrahive-ai-search.vercel.app/Logo%20(Digest).png" alt="Bot" className="w-full h-full object-cover rounded-full" />
//                           </div>
//                           <div className="flex-1 space-y-2">
//                             <div className={isDarkMode ? 'text-white' : 'text-gray-900'}>
//                               {renderAssistantContent(message.content)}
//                             </div>
//                             <div className="flex items-center gap-2 mt-2">
//                               <button className={`p-1 rounded ${
//                                 isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
//                               }`}>
//                                 <ThumbsUp size={16} />
//                               </button>
//                               <button className={`p-1 rounded ${
//                                 isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
//                               }`}>
//                                 <ThumbsDown size={16} />
//                               </button>
//                               <button className={`p-1 rounded ${
//                                 isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
//                               }`}>
//                                 <RotateCcw size={16} />
//                               </button>
//                             </div>
//                           </div>
//                         </div>
//                       ) : (
//                         <div className="flex justify-end gap-4">
//                           <div className="max-w-[85%] space-y-2">
//                             <div className="bg-[#303030] text-white p-3 rounded-full">
//                               {message.content}
//                             </div>
//                           </div>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 ))}
//                 {loading && (
//                   <div className="max-w-2xl mx-auto p-4 flex gap-4">
//                     <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white">
//                       <Bot size={16} />
//                     </div>
//                     <div className="flex items-center">
//                       <Loader className="animate-spin" size={16} />
//                     </div>
//                   </div>
//                 )}
//                 <div ref={messagesEndRef} />
//               </div>

//               {/* Fixed Input Area */}
//               <div 
//                 className={`fixed bottom-0 left-0 right-80 border-t p-4 ${
//                   isDarkMode ? 'border-gray-700' : 'border-gray-200'
//                 }`}
//                 style={{ backgroundColor: isDarkMode ? '#212121' : '#ffffff' }}
//               >
//                 <div className="max-w-2xl mx-auto">
//                   <form onSubmit={handleSubmit} className="relative">
//                     <input
//                       type="text"
//                       value={input}
//                       onChange={(e) => setInput(e.target.value)}
//                       placeholder="Send a message..."
//                       className={`w-full p-4 pr-12 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-500 ${
//                         isDarkMode 
//                           ? 'border-gray-600 bg-gray-800 text-white placeholder-gray-400' 
//                           : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'
//                       }`}
//                     />
//                     <button 
//                       type="submit"
//                       disabled={!input.trim() || loading}
//                       className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 disabled:opacity-50 ${
//                         isDarkMode
//                           ? 'text-gray-400 hover:text-gray-200'
//                           : 'text-gray-500 hover:text-gray-700'
//                       }`}
//                     >
//                       <Send size={20} />
//                     </button>
//                   </form>
//                 </div>
//               </div>
//             </>
//           )}
//         </div>
//       </div>

//       {/* Resources Sidebar - Only shown when there are resources */}
//       {currentResources.length > 0 && (
//         <div 
//           className={`w-80 border-l p-4 overflow-y-auto fixed right-0 top-0 h-screen ${
//             isDarkMode ? 'border-gray-700 bg-[#212121] text-white' : 'border-gray-200 bg-white text-gray-900'
//           }`}
//         >
//           <div className="space-y-4">
//             <h2 className="text-lg font-semibold flex items-center gap-2">
//               <Link size={20} />
//               Sources
//             </h2>
//             {currentResources.map((resource, index) => (
//               <a
//                 key={index}
//                 href={resource.link}
//                 className={`flex items-center gap-2 p-3 rounded-lg border ${
//                   isDarkMode 
//                     ? 'border-gray-700 hover:bg-gray-800 text-blue-400' 
//                     : 'border-gray-200 hover:bg-gray-50 text-blue-600'
//                 }`}
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 <ExternalLink size={16} />
//                 {resource.title}
//               </a>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default DraftChat;







// import React from 'react';
// import { 
//   Sun, Moon, HelpCircle, Bot, ThumbsUp, 
//   ThumbsDown, RotateCcw, Send, Loader, Link, ExternalLink 
// } from 'lucide-react';
// import { useState, useRef, useEffect } from 'react';

// const DraftChat = () => {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [isDarkMode, setIsDarkMode] = useState(true);
//   const [currentResources, setCurrentResources] = useState([]);
//   const messagesEndRef = useRef(null);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages, loading]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (input.trim()) {
//       setMessages(prev => [...prev, { 
//         role: 'user', 
//         content: input.trim(),
//         id: prev.length + 1
//       }]);
//       setLoading(true);
//       setInput('');
//       setCurrentResources([]);

//       setTimeout(() => {
//         const response = {
//           role: 'assistant', 
//           content: {
//             title: "Raj Rani And Others vs State Of Punjab And Others on 6 May, 2019",
//             doc_link: "https://indiankanoon.org/doc/152322669/",
//             publish_date: "2019-05-06",
//             author: "R Sehrawat",
//             headline: "Protection of life and personal liberty: No person shall be deprived of his life or personal liberty except according to procedure established.",
//             resources: [
//               { type: 'documentation', title: 'Official Documentation', link: 'https://indiankanoon.org/doc/152322669/' },
//               { type: 'documentation', title: 'Official Documentation', link: 'https://indiankanoon.org/doc/152322669/' }
//             ]
//           },
//           id: messages.length + 2
//         };
//         setMessages(prev => [...prev, response]);
//         setCurrentResources(response.content.resources);
//         setLoading(false);
//       }, 1000);
//     }
//   };

//   const toggleTheme = () => {
//     setIsDarkMode(!isDarkMode);
//   };

//   const isEmpty = messages.length === 0 && !loading;

//   const renderAssistantContent = (content) => {
//     if (typeof content === 'string') return content;

//     return (
//       <div className={`space-y-4 border rounded-md p-3 ${
//         isDarkMode ? 'border-transparent' : 'border-gray-200 bg-gray-100'
//       }`}>
//         <p><span className="font-bold">Title: </span>{content.title}</p>
//         <p><span className="font-bold">Publish Date: </span>{content.publish_date}</p>
//         <p><span className="font-bold">Author: </span>{content.author}</p>
//         <p><span className="font-bold">Headline: </span>{content.headline}</p>
//       </div>
//     );
//   };

//   return (
//     <div className="flex h-screen" style={{ backgroundColor: isDarkMode ? '#212121' : '#ffffff' }}>
//       <div className={`flex-1 flex flex-col relative transition-all duration-200 ${
//         currentResources.length > 0 ? 'mr-80' : ''
//       }`}>
//         <nav 
//           className={`border-b p-2 flex items-center justify-end sticky top-0 z-20 ${
//             isDarkMode ? 'border-gray-700' : 'border-gray-200'
//           }`}
//           style={{ backgroundColor: isDarkMode ? '#212121' : '#ffffff' }}
//         >
//           <div className="flex items-center gap-2">
//             <button 
//               onClick={toggleTheme}
//               className={`p-2 rounded-md ${
//                 isDarkMode ? 'hover:bg-gray-800 text-white' : 'hover:bg-gray-100 text-gray-800'
//               }`}
//             >
//               {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
//             </button>
//             <button className={`p-2 rounded-md ${
//               isDarkMode ? 'hover:bg-gray-800 text-white' : 'hover:bg-gray-100 text-gray-800'
//             }`}>
//               <HelpCircle size={20} />
//             </button>
//           </div>
//         </nav>

//         <div className="flex-1 overflow-y-auto">
//           {isEmpty ? (
//             <div className="h-full flex flex-col justify-center items-center p-4">
//               <h1 className={`text-4xl font-bold text-center mb-8 ${
//                 isDarkMode ? 'text-white' : 'text-gray-800'
//               }`}>
//                 ChatGPT
//               </h1>
//               <div className="w-full max-w-2xl">
//                 <form onSubmit={handleSubmit} className="relative">
//                   <input
//                     type="text"
//                     value={input}
//                     onChange={(e) => setInput(e.target.value)}
//                     placeholder="Send a message..."
//                     className={`w-full p-4 pr-12 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-500 ${
//                       isDarkMode 
//                         ? 'border-gray-600 bg-gray-800 text-white placeholder-gray-400' 
//                         : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'
//                     }`}
//                   />
//                   <button 
//                     type="submit"
//                     disabled={!input.trim() || loading}
//                     className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 disabled:opacity-50 ${
//                       isDarkMode
//                         ? 'text-gray-400 hover:text-gray-200'
//                         : 'text-gray-500 hover:text-gray-700'
//                     }`}
//                   >
//                     <Send size={20} />
//                   </button>
//                 </form>
//               </div>
//             </div>
//           ) : (
//               <>
//                 <div className='flex'>
//             <div>
//               <div className="pb-32">
//                 {messages.map((message) => (
//                   <div key={message.id}>
//                     <div className="max-w-2xl ml-[150px] p-4 ">
//                       {message.role === 'assistant' ? (
//                         <div className="flex gap-4">
//                           <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white shrink-0 ${
//                             isDarkMode ? 'bg-gray-700' : 'bg-gray-600'
//                           }`}>
//                             <Bot size={16} />
//                             <img src="https://infrahive-ai-search.vercel.app/Logo%20(Digest).png" />
//                             {/* <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2d7bF1q2WBQnHUhqaR2OuxjFiv_EIWBwqow&s" /> */}
//                           </div>
//                           <div className="flex-1 space-y-2">
//                             <div className={isDarkMode ? 'text-white' : 'text-gray-900'}>
//                               {renderAssistantContent(message.content)}
//                             </div>
//                             <div className="flex items-center gap-2 mt-2">
//                               <button className={`p-1 rounded ${
//                                 isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
//                               }`}>
//                                 <ThumbsUp size={16} />
//                               </button>
//                               <button className={`p-1 rounded ${
//                                 isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
//                               }`}>
//                                 <ThumbsDown size={16} />
//                               </button>
//                               <button className={`p-1 rounded ${
//                                 isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
//                               }`}>
//                                 <RotateCcw size={16} />
//                               </button>
//                             </div>
//                           </div>
//                         </div>
//                       ) : (
//                         <div className="flex justify-end gap-4">
//                           <div className="max-w-[85%] space-y-2">
//                             <div className="bg-[#303030] text-white p-3 rounded-full">
//                               {message.content}
//                             </div>
//                           </div>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 ))}
//                 {loading && (
//                   <div className="max-w-2xl ml-[150px] p-4 flex gap-4">
//                     <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white">
//                       <Bot size={16} />
//                        <img src="https://infrahive-ai-search.vercel.app/Logo%20(Digest).png" />
//                     </div>
//                     <div className="flex items-center">
//                       <Loader className="animate-spin" size={16} />
//                     </div>
//                   </div>
//                 )}
//                 <div ref={messagesEndRef} />
//               </div>

//               <div 
//                 className={`fixed bottom-0 left-32  p-4 z-0  ${
//                   currentResources.length >= 0 ? 'right-64' : 'right-0'
//                 } ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}
//                 style={{ backgroundColor: isDarkMode ? '#212121' : '#ffffff' }}
//               >
//                 <div className="max-w-2xl mx-auto">
//                   <form onSubmit={handleSubmit} className="relative">
//                     <input
//                       type="text"
//                       value={input}
//                       onChange={(e) => setInput(e.target.value)}
//                       placeholder="Send a messageeeeee..."
//                       className={`w-full p-4 pr-12 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-500 ${
//                         isDarkMode 
//                           ? 'border-gray-600 bg-gray-800 text-white placeholder-gray-400' 
//                           : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'
//                       }`}
//                     />
//                     <button 
//                       type="submit"
//                       disabled={!input.trim() || loading}
//                       className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 disabled:opacity-50 ${
//                         isDarkMode
//                           ? 'text-gray-400 hover:text-gray-200'
//                           : 'text-gray-500 hover:text-gray-700'
//                       }`}
//                     >
//                       <Send size={20} />
//                     </button>
//                   </form>
//                 </div>
//               </div>
//                   </div>
//                   {currentResources.length >= 0 && (
//         <div 
//           className={`w-80 border-l p-4 overflow-y-auto fixed right-0 top-0 h-screen z-40 ${
//             isDarkMode ? 'border-gray-700 bg-[#212121] text-white' : 'border-gray-200 bg-white text-gray-900'
//           }`}
//         >
//           <div className="space-y-4 pb-24">
//             <h2 className="text-lg font-semibold flex items-center gap-2">
//               <Link size={20} />
//               Sources
//             </h2>
//             {currentResources.map((resource, index) => (
//               <a
//                 key={index}
//                 href={resource.link}
//                 className={`flex items-center gap-2 p-3 rounded-lg border ${
//                   isDarkMode 
//                     ? 'border-gray-700 hover:bg-gray-800 text-blue-400' 
//                     : 'border-gray-200 hover:bg-gray-50 text-blue-600'
//                 }`}
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 <ExternalLink size={16} />
//                 {resource.title}
//               </a>
//             ))}
//           </div>
//         </div>
//       )}
//                   </div>
//             </>
//           )}
//         </div>
//       </div>

      
//     </div>
//   );
// };

// export default DraftChat;





// import React, { useState, useRef, useEffect } from 'react';
// import { 
//   Sun, Moon, HelpCircle, Bot, ThumbsUp, 
//   ThumbsDown, RotateCcw, Send, Loader, Link, ExternalLink 
// } from 'lucide-react';

// const DraftChat = () => {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [isDarkMode, setIsDarkMode] = useState(true);
//   const [currentResources, setCurrentResources] = useState([]);
//   const [showSources, setShowSources] = useState(false);
//   const messagesEndRef = useRef(null);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages, loading]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (input.trim()) {
//       setMessages(prev => [...prev, { 
//         role: 'user', 
//         content: input.trim(),
//         id: prev.length + 1
//       }]);
//       setLoading(true);
//       setInput('');
//       setShowSources(false);

//       setTimeout(() => {
//         const response = {
//           role: 'assistant', 
//           content: {
//             title: "Raj Rani And Others vs State Of Punjab And Others on 6 May, 2019",
//             doc_link: "https://indiankanoon.org/doc/152322669/",
//             publish_date: "2019-05-06",
//             author: "R Sehrawat",
//             headline: "Protection of life and personal liberty: No person shall be deprived of his life or personal liberty except according to procedure established.",
//             resources: [
//               { type: 'documentation', title: 'Official Documentation', link: 'https://indiankanoon.org/doc/152322669/' },
//               { type: 'documentation', title: 'Official Documentation', link: 'https://indiankanoon.org/doc/152322669/' }
//             ]
//           },
//           id: messages.length + 2
//         };
//         setMessages(prev => [...prev, response]);
//         setCurrentResources(response.content.resources);
//         setLoading(false);
//       }, 1000);
//     }
//   };

//   const toggleTheme = () => {
//     setIsDarkMode(!isDarkMode);
//   };

//   const toggleSources = () => {
//     setShowSources(!showSources);
//   };

//   const isEmpty = messages.length === 0 && !loading;

//   const renderAssistantContent = (content) => {
//     if (typeof content === 'string') return content;

//     return (
//       <div className={`space-y-4 border rounded-md p-3 ${
//         isDarkMode ? 'border-transparent' : 'border-gray-200 bg-gray-100'
//       }`}>
//         <p><span className="font-bold">Title: </span>{content.title}</p>
//         <p><span className="font-bold">Publish Date: </span>{content.publish_date}</p>
//         <p><span className="font-bold">Author: </span>{content.author}</p>
//         <p><span className="font-bold">Headline: </span>{content.headline}</p>
//       </div>
//     );
//   };

//   return (
//     <div className="h-screen flex" style={{ backgroundColor: isDarkMode ? '#212121' : '#ffffff' }}>
//       <div className="flex-1 flex flex-col">
//         <nav 
//           className={`border-b p-2 flex items-center justify-end sticky top-0 z-20 ${
//             isDarkMode ? 'border-gray-700' : 'border-gray-200'
//           }`}
//           style={{ backgroundColor: isDarkMode ? '#212121' : '#ffffff' }}
//         >
//           <div className="flex items-center gap-2">
//             <button 
//               onClick={toggleTheme}
//               className={`p-2 rounded-md ${
//                 isDarkMode ? 'hover:bg-gray-800 text-white' : 'hover:bg-gray-100 text-gray-800'
//               }`}
//             >
//               {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
//             </button>
//             <button className={`p-2 rounded-md ${
//               isDarkMode ? 'hover:bg-gray-800 text-white' : 'hover:bg-gray-100 text-gray-800'
//             }`}>
//               <HelpCircle size={20} />
//             </button>
//           </div>
//         </nav>

//         <div className="flex-1 overflow-y-auto">
//           {isEmpty ? (
//             <div className="h-full flex flex-col justify-center items-center p-4">
//               <h1 className={`text-4xl font-bold text-center mb-8 ${
//                 isDarkMode ? 'text-white' : 'text-gray-800'
//               }`}>
//                 ChatGPT
//               </h1>
//               <div className="w-full max-w-2xl">
//                 <form onSubmit={handleSubmit} className="relative">
//                   <input
//                     type="text"
//                     value={input}
//                     onChange={(e) => setInput(e.target.value)}
//                     placeholder="Send a message..."
//                     className={`w-full p-4 pr-12 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-500 ${
//                       isDarkMode 
//                         ? 'border-gray-600 bg-gray-800 text-white placeholder-gray-400' 
//                         : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'
//                     }`}
//                   />
//                   <button 
//                     type="submit"
//                     disabled={!input.trim() || loading}
//                     className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 disabled:opacity-50 ${
//                       isDarkMode
//                         ? 'text-gray-400 hover:text-gray-200'
//                         : 'text-gray-500 hover:text-gray-700'
//                     }`}
//                   >
//                     <Send size={20} />
//                   </button>
//                 </form>
//               </div>
//             </div>
//           ) : (
//             <div>
//               <div className="pb-32">
//                 {messages.map((message) => (
//                   <div key={message.id}>
//                     <div className="max-w-2xl ml-[150px] p-4">
//                       {message.role === 'assistant' ? (
//                         <div className="flex gap-4">
//                           <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white shrink-0 ${
//                             isDarkMode ? 'bg-gray-700' : 'bg-gray-600'
//                           }`}>
//                             <img 
//                               src="https://infrahive-ai-search.vercel.app/Logo%20(Digest).png" 
//                               alt="Bot"
//                               className="w-full h-full object-cover rounded-full"
//                             />
//                           </div>
//                           <div className="flex-1 space-y-2">
//                             <div className={isDarkMode ? 'text-white' : 'text-gray-900'}>
//                               {renderAssistantContent(message.content)}
//                             </div>
//                             <div className="flex items-center gap-2 mt-2">
//                               <button className={`p-1 rounded ${
//                                 isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
//                               }`}>
//                                 <ThumbsUp size={16} />
//                               </button>
//                               <button className={`p-1 rounded ${
//                                 isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
//                               }`}>
//                                 <ThumbsDown size={16} />
//                               </button>
//                               <button className={`p-1 rounded ${
//                                 isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
//                               }`}>
//                                 <RotateCcw size={16} />
//                               </button>
//                               {message.content.resources && (
//                                 <button 
//                                   onClick={toggleSources}
//                                   className={`flex items-center gap-1 p-1 px-2 rounded text-sm ${
//                                     isDarkMode 
//                                       ? 'hover:bg-gray-800 text-blue-400' 
//                                       : 'hover:bg-gray-100 text-blue-600'
//                                   }`}
//                                 >
//                                   <Link size={14} />
//                                   Sources
//                                 </button>
//                               )}
//                             </div>
//                           </div>
//                         </div>
//                       ) : (
//                         <div className="flex justify-end gap-4">
//                           <div className="max-w-[85%] space-y-2">
//                             <div className="bg-[#303030] text-white p-3 rounded-full">
//                               {message.content}
//                             </div>
//                           </div>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 ))}
//                 {loading && (
//                   <div className="max-w-2xl ml-[150px] p-4 flex gap-4">
//                     <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white">
//                       <Bot size={16} />
//                     </div>
//                     <div className="flex items-center">
//                       <Loader className="animate-spin" size={16} />
//                     </div>
//                   </div>
//                 )}
//                 <div ref={messagesEndRef} />
//               </div>

//               <div 
//                 className={`fixed bottom-0 left-32 p-4 z-0 ${
//                   showSources ? 'right-64' : 'right-0'
//                 } ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}
//                 style={{ backgroundColor: isDarkMode ? '#212121' : '#ffffff' }}
//               >
//                 <div className="max-w-2xl mx-auto">
//                   <form onSubmit={handleSubmit} className="relative">
//                     <input
//                       type="text"
//                       value={input}
//                       onChange={(e) => setInput(e.target.value)}
//                       placeholder="Send a message..."
//                       className={`w-full p-4 pr-12 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-500 ${
//                         isDarkMode 
//                           ? 'border-gray-600 bg-gray-800 text-white placeholder-gray-400' 
//                           : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'
//                       }`}
//                     />
//                     <button 
//                       type="submit"
//                       disabled={!input.trim() || loading}
//                       className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 disabled:opacity-50 ${
//                         isDarkMode
//                           ? 'text-gray-400 hover:text-gray-200'
//                           : 'text-gray-500 hover:text-gray-700'
//                       }`}
//                     >
//                       <Send size={20} />
//                     </button>
//                   </form>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {showSources && currentResources.length > 0 && (
//         <div 
//           className={`w-64 border-l p-4 overflow-y-auto fixed right-0 top-0 h-screen z-40 ${
//             isDarkMode ? 'border-gray-700 bg-[#212121] text-white' : 'border-gray-200 bg-white text-gray-900'
//           }`}
//         >
//           <div className="space-y-4 pb-24">
//             <div className="flex items-center justify-between">
//               <h2 className="text-lg font-semibold flex items-center gap-2">
//                 <Link size={20} />
//                 Sources
//               </h2>
//               <button 
//                 onClick={toggleSources}
//                 className={`p-1 rounded-full ${
//                   isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
//                 }`}
//               >
//                 ✕
//               </button>
//             </div>
//             {currentResources.map((resource, index) => (
//               <a
//                 key={index}
//                 href={resource.link}
//                 className={`flex items-center gap-2 p-3 rounded-lg border ${
//                   isDarkMode 
//                     ? 'border-gray-700 hover:bg-gray-800 text-blue-400' 
//                     : 'border-gray-200 hover:bg-gray-50 text-blue-600'
//                 }`}
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 <ExternalLink size={14} />
//                 {resource.title}
//               </a>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default DraftChat;









// import React, { useState, useRef, useEffect } from 'react';
// import { 
//   Sun, Moon, HelpCircle, Bot, ThumbsUp, 
//   ThumbsDown, RotateCcw, Send, Loader, Link, ExternalLink 
// } from 'lucide-react';

// const DraftChat = () => {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [isDarkMode, setIsDarkMode] = useState(true);
//   const [currentResources, setCurrentResources] = useState([]);
//   const [showSources, setShowSources] = useState(false);
//   const messagesEndRef = useRef(null);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages, loading]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (input.trim()) {
//       setMessages(prev => [...prev, { 
//         role: 'user', 
//         content: input.trim(),
//         id: prev.length + 1
//       }]);
//       setLoading(true);
//       setInput('');
//       setShowSources(false);

//       setTimeout(() => {
//         const response = {
//           role: 'assistant', 
//           content: {
//             title: "Raj Rani And Others vs State Of Punjab And Others on 6 May, 2019",
//             doc_link: "https://indiankanoon.org/doc/152322669/",
//             publish_date: "2019-05-06",
//             author: "R Sehrawat",
//             headline: "Protection of life and personal liberty: No person shall be deprived of his life or personal liberty except according to procedure established.",
//             resources: [
//               { type: 'documentation', title: 'Official Documentation', link: 'https://indiankanoon.org/doc/152322669/' },
//               { type: 'documentation', title: 'Official Documentation', link: 'https://indiankanoon.org/doc/152322669/' }
//             ]
//           },
//           id: messages.length + 2
//         };
//         setMessages(prev => [...prev, response]);
//         setCurrentResources(response.content.resources);
//         setLoading(false);
//       }, 1000);
//     }
//   };

//   const toggleTheme = () => {
//     setIsDarkMode(!isDarkMode);
//   };

//   const toggleSources = () => {
//     setShowSources(!showSources);
//   };

//   const isEmpty = messages.length === 0 && !loading;

//   const renderAssistantContent = (content) => {
//     if (typeof content === 'string') return content;

//     return (
//       <div className={`space-y-4 border rounded-md p-3 ${
//         isDarkMode ? 'border-transparent' : 'border-gray-200 bg-gray-100'
//       }`}>
//         <p><span className="font-bold">Title: </span>{content.title}</p>
//         <p><span className="font-bold">Publish Date: </span>{content.publish_date}</p>
//         <p><span className="font-bold">Author: </span>{content.author}</p>
//         <p><span className="font-bold">Headline: </span>{content.headline}</p>
//       </div>
//     );
//   };

//   return (
//     <div className="flex h-screen" style={{ backgroundColor: isDarkMode ? '#212121' : '#ffffff' }}>
//       <div className="flex-1 flex flex-col relative">
//         <nav 
//           className={`border-b p-2 flex items-center justify-end sticky top-0 z-20 ${
//             isDarkMode ? 'border-gray-700' : 'border-gray-200'
//           }`}
//           style={{ backgroundColor: isDarkMode ? '#212121' : '#ffffff' }}
//         >
//           <div className="flex items-center gap-2">
//             <button onClick={toggleTheme} className={`p-2 rounded-md ${
//               isDarkMode ? 'hover:bg-gray-800 text-white' : 'hover:bg-gray-100 text-gray-800'
//             }`}>
//               {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
//             </button>
//             <button className={`p-2 rounded-md ${
//               isDarkMode ? 'hover:bg-gray-800 text-white' : 'hover:bg-gray-100 text-gray-800'
//             }`}>
//               <HelpCircle size={20} />
//             </button>
//           </div>
//         </nav>

//         <div className="flex-1 overflow-y-auto">
//           {isEmpty ? (
//             <div className="h-full flex flex-col justify-center items-center p-4">
//               <h1 className={`text-4xl font-bold text-center mb-8 ${
//                 isDarkMode ? 'text-white' : 'text-gray-800'
//               }`}>
//                 ChatGPT
//               </h1>
//               <div className="w-full max-w-2xl">
//                 <form onSubmit={handleSubmit} className="relative">
//                   <input
//                     type="text"
//                     value={input}
//                     onChange={(e) => setInput(e.target.value)}
//                     placeholder="Send a message..."
//                     className={`w-full p-4 pr-12 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-500 ${
//                       isDarkMode 
//                         ? 'border-gray-600 bg-gray-800 text-white placeholder-gray-400' 
//                         : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'
//                     }`}
//                   />
//                   <button 
//                     type="submit"
//                     disabled={!input.trim() || loading}
//                     className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 disabled:opacity-50 ${
//                       isDarkMode
//                         ? 'text-gray-400 hover:text-gray-200'
//                         : 'text-gray-500 hover:text-gray-700'
//                     }`}
//                   >
//                     <Send size={20} />
//                   </button>
//                 </form>
//               </div>
//             </div>
//           ) : (
//             <div className="flex">
//               <div className="flex-1">
//                 <div className="pb-32">
//                   {messages.map((message) => (
//                     <div key={message.id}>
//                       <div className="max-w-2xl ml-[200px] p-4">
//                         {message.role === 'assistant' ? (
//                           <div className="flex gap-4">
//                             <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white shrink-0 ${
//                               isDarkMode ? 'bg-gray-700' : 'bg-gray-600'
//                             }`}>
//                               <img 
//                                 src="https://infrahive-ai-search.vercel.app/Logo%20(Digest).png"
//                                 alt="Bot"
//                                 className="w-full h-full object-cover rounded-full"
//                               />
//                             </div>
//                             <div className="flex-1 space-y-2">
//                               <div className={isDarkMode ? 'text-white' : 'text-gray-900'}>
//                                 {renderAssistantContent(message.content)}
//                               </div>
//                               <div className="flex items-center gap-2 mt-2">
//                                 <button className={`p-1 rounded ${
//                                   isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
//                                 }`}>
//                                   <ThumbsUp size={16} />
//                                 </button>
//                                 <button className={`p-1 rounded ${
//                                   isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
//                                 }`}>
//                                   <ThumbsDown size={16} />
//                                 </button>
//                                 <button className={`p-1 rounded ${
//                                   isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
//                                 }`}>
//                                   <RotateCcw size={16} />
//                                 </button>
//                                 {message.content.resources && (
//                                   <button 
//                                     onClick={toggleSources}
//                                     className={`flex items-center gap-1 p-1 px-2 rounded border border-black  text-sm ${
//                                       isDarkMode 
//                                         ? 'border-white bg-gray-700 hover:bg-gray-800 text-blue-400 hover:text-blue-300' 
//                                         : 'bg-gray-200 hover:bg-gray-100 text-blue-600 hover:text-blue-700'
//                                     }`}
//                                   >
//                                     <Link size={14} />
//                                     Sources
//                                   </button>
//                                 )}
//                               </div>
//                             </div>
//                           </div>
//                         ) : (
//                           <div className="flex justify-end gap-4">
//                             <div className="max-w-[85%] space-y-2">
//                               <div className="bg-[#303030] text-white p-3 rounded-full">
//                                 {message.content}
//                               </div>
//                             </div>
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   ))}
//                   {loading && (
//                     <div className="max-w-2xl ml-[150px] p-4 flex gap-4">
//                       <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white">
//                         <Bot size={16} />
//                       </div>
//                       <div className="flex items-center">
//                         <Loader className="animate-spin" size={16} />
//                       </div>
//                     </div>
//                   )}
//                   <div ref={messagesEndRef} />
//                 </div>

//                 <div 
//                   className={`fixed left-[47%] transform -translate-x-1/2 bottom-0 w-full  p-4 z-2 ${
//                     showSources ? 'right-0' : 'right-0'
//                   } ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}
//                   style={{ backgroundColor: isDarkMode ? '#212121' : '#ffffff' }}
//                 >
//                   <div className="max-w-2xl mx-auto">
//                     <form onSubmit={handleSubmit} className="relative">
//                       <input
//                         type="text"
//                         value={input}
//                         onChange={(e) => setInput(e.target.value)}
//                         placeholder="Send a message..."
//                         className={`w-full p-4 pr-12 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-500 ${
//                           isDarkMode 
//                             ? 'border-gray-600 bg-gray-800 text-white placeholder-gray-400' 
//                             : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'
//                         }`}
//                       />
//                       <button 
//                         type="submit"
//                         disabled={!input.trim() || loading}
//                         className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 disabled:opacity-50 ${
//                           isDarkMode
//                             ? 'text-gray-400 hover:text-gray-200'
//                             : 'text-gray-500 hover:text-gray-700'
//                         }`}
//                       >
//                         <Send size={20} />
//                       </button>
//                     </form>
//                   </div>
//                 </div>
//               </div>

//               {showSources && currentResources.length > 0 && (
//                 <div 
//                   className={`w-64 border-l p-4 overflow-y-auto fixed right-0 top-0 h-screen z-40 ${
//                     isDarkMode ? 'border-gray-700 bg-[#212121] text-white' : 'border-gray-200 bg-white text-gray-900'
//                   }`}
//                 >
//                   <div className="space-y-4 pb-24">
//                     <div className="flex items-center justify-between">
//                       <h2 className="text-lg font-semibold flex items-center gap-2">
//                         <Link size={20} />
//                         Sources
//                       </h2>
//                       <button 
//                         onClick={toggleSources}
//                         className={`p-1 rounded-full ${
//                           isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
//                         }`}
//                       >
//                         ×
//                       </button>
//                     </div>
//                     {currentResources.map((resource, index) => (
//                       <a
//                         key={index}
//                         href={resource.link}
//                         className={`flex items-center gap-2 p-3 rounded-lg border ${
//                           isDarkMode 
//                             ? 'border-gray-700 hover:bg-gray-800 text-blue-400' 
//                             : 'border-gray-200 hover:bg-gray-50 text-blue-600'
//                         }`}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                       >
//                         <ExternalLink size={14} />
//                         {resource.title}
//                       </a>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DraftChat;

















// import { useState, useRef, useEffect } from 'react';
// import { 
//   Sun, Moon, HelpCircle, Bot, ThumbsUp, 
//   ThumbsDown, RotateCcw, Send, Loader, Link, ExternalLink 
// } from 'lucide-react';
// // import axios from 'axios';


// const DraftChat = () => {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [isDarkMode, setIsDarkMode] = useState(true);
//   const [currentResources, setCurrentResources] = useState([]);
//   const [showSources, setShowSources] = useState(false);
//   const messagesEndRef = useRef(null);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages, loading]);

// //   const handleSubmit = async(e) => {
// //     e.preventDefault();
// //     if (input.trim()) {
// //       setMessages(prev => [...prev, { 
// //         role: 'user', 
// //         content: input.trim(),
// //         id: prev.length + 1
// //       }]);
// //       setLoading(true);
// //       setInput('');
// //       setShowSources(false);

// //       // setTimeout(() => {
// //       //   const response = {
// //       //     role: 'assistant',
// //       //     content: {
// //       //       title: "Raj Rani And Others vs State Of Punjab And Others on 6 May, 2019",
// //       //       doc_link: "https://indiankanoon.org/doc/152322669/",
// //       //       publish_date: "2019-05-06",
// //       //       author: "R Sehrawat",
// //       //       headline: "Protection of life and personal liberty: No person shall be deprived of his life or personal liberty except according to procedure established.",
// //       //       resources: [
// //       //         {
// //       //           type: 'documentation',
// //       //           title: 'Official Documentation',
// //       //           link: 'https://indiankanoon.org/doc/152322669/',
// //       //           meta_title: 'Raj Rani And Others vs State Of Punjab And Others on 6 May, 2019',
// //       //           heading: 'Article 21 in The Constitution Of India 1949'
// //       //         },
// //       //         {
// //       //           type: 'documentation',
// //       //           title: 'Related Case Law',
// //       //           link: 'https://indiankanoon.org/doc/152322669/',
// //       //           meta_title: 'Supreme Court Judgment',
// //       //           heading: 'Protection of Personal Liberty Under Article 21'
// //       //         }
// //       //       ]
// //       //     },
// //       //     id: messages.length + 2
// //       //   };
// //       //   setMessages(prev => [...prev, response]);
// //       //   setCurrentResources(response.content.resources);
// //       //   setLoading(false);
// //       // }, 1000);

// // // const requestData = {
// // //   user_prompt: "Retrieve information related to cases like protection of liberty",
// // // };

// //       await axios.post('https://legal-ai-backend-draft-drh9bmergvh7a4a9.southeastasia-01.azurewebsites.net/legal/research/', {
// //   user_prompt: input
// // }, {
// //   headers: {
// //     'Content-Type': 'application/json',
// //     'x-cors-api-key': 'temp_2ebea695b738ebd037a73e6df8c7cd92'
// //   }
// // })
// //   .then(response => {
// //     console.log('Response:', response.data);
// //   })
// //   .catch(error => {
// //     console.error('Error:', error);
// //   });


// //     }
// //   };

 
  
//   // const handleSubmit = async(e) => {
//   //   e.preventDefault();
//   //   if (input.trim()) {
//   //     // Add user message
//   //     setMessages(prev => [...prev, {
//   //       role: 'user',
//   //       content: input.trim(),
//   //       id: prev.length + 1
//   //     }]);
//   //     setLoading(true);
//   //     setInput('');
//   //     setShowSources(false);

//   //     try {
//   //       const response = await fetch('https://legal-ai-backend-draft-drh9bmergvh7a4a9.southeastasia-01.azurewebsites.net/legal/research/', {
//   //         method: 'POST',
//   //         headers: {
//   //           'Content-Type': 'application/json',
//   //         },
//   //         body: JSON.stringify({
//   //           user_prompt: input.trim()
//   //         })
//   //       });

//   //       if (!response.ok) {
//   //         throw new Error('API request failed');
//   //       }

//   //       const data = await response.json();
        
//   //       // Format API response to match your UI structure
//   //       const formattedResponse = {
//   //         role: 'assistant',
//   //         content: {
//   //           title: data.title || 'Legal Response',
//   //           doc_link: data.doc_link || '#',
//   //           publish_date: data.publish_date || new Date().toISOString().split('T')[0],
//   //           author: data.author || 'Legal AI',
//   //           headline: data.headline || data.summary || data.response,
//   //           resources: data.resources || []
//   //         },
//   //         id: messages.length + 2
//   //       };

//   //       setMessages(prev => [...prev, formattedResponse]);
//   //       setCurrentResources(formattedResponse.content.resources);
//   //     } catch (error) {
//   //       console.error('Error calling API:', error);
//   //       // Add error message to chat
//   //       setMessages(prev => [...prev, {
//   //         role: 'assistant',
//   //         content: {
//   //           title: 'Error',
//   //           headline: 'Sorry, there was an error processing your request. Please try again.',
//   //           resources: []
//   //         },
//   //         id: prev.length + 2
//   //       }]);
//   //     } finally {
//   //       setLoading(false);
//   //     }
//   //   }
//   // };

  
  

//   const handleSubmit = async(e) => {
//     e.preventDefault();
//     if (input.trim()) {
//       setMessages(prev => [...prev, { 
//         role: 'user', 
//         content: input.trim(),
//         id: prev.length + 1
//       }]);
//       setLoading(true);
//       setInput('');
//       setShowSources(false);

//       try {
//         // Using the proxied URL instead of the direct API URL
//         const response = await fetch('/api/legal/research/', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             user_prompt: input.trim()
//           })
//         });

//         if (!response.ok) {
//           throw new Error(`API request failed with status ${response.status}`);
//         }

//         const data = await response.json();
//         console.log(data);
        
        
//         // Format API response to match your UI structure
//         const formattedResponse = {
//           role: 'assistant',
//           content: {
//             title: data.title || 'Legal Response',
//             doc_link: data.doc_link || '#',
//             publish_date: data.publish_date || new Date().toISOString().split('T')[0],
//             author: data.author || 'Legal AI',
//             headline: data.headline || data.summary || data.response,
//             resources: data.resources || []
//           },
//           id: messages.length + 2
//         };

//         setMessages(prev => [...prev, formattedResponse]);
//         if (formattedResponse.content.resources) {
//           setCurrentResources(formattedResponse.content.resources);
//         }
//       } catch (error) {
//         console.error('Error calling API:', error);
//         setMessages(prev => [...prev, {
//           role: 'assistant',
//           content: {
//             title: 'Error',
//             headline: `Error: ${error.message}. Please try again or contact support if the problem persists.`,
//             resources: []
//           },
//           id: prev.length + 2
//         }]);
//       } finally {
//         setLoading(false);
//       }
//     }
//   };
  
  
//   const toggleTheme = () => {
//     setIsDarkMode(!isDarkMode);
//   };

//   const toggleSources = () => {
//     setShowSources(!showSources);
//   };

//   const isEmpty = messages.length === 0 && !loading;

//   // const renderAssistantContent = (content) => {
//   //   if (typeof content === 'string') return content;

//   //   return (
//   //     <div className={`space-y-4 border rounded-md p-3 ${
//   //       isDarkMode ? 'border-transparent' : 'border-gray-200 bg-gray-100'
//   //     }`}>
//   //       <p><span className="font-bold">Title: </span>{content.title}</p>
//   //       <p><span className="font-bold">Publish Date: </span>{content.publish_date}</p>
//   //       <p><span className="font-bold">Author: </span>{content.author}</p>
//   //       <p><span className="font-bold">Headline: </span>{content.headline}</p>
//   //     </div>
//   //   );
//   // };



//   // const renderAssistantContent = (content) => {
//   //   if (typeof content === 'string') return content;

//   //   return (
//   //     <div className={`space-y-4 border rounded-md p-3 ${
//   //       isDarkMode ? 'border-transparent' : 'border-gray-200 bg-gray-100'
//   //     }`}>
//   //       {content.title && <p><span className="font-bold">Title: </span>{content.title}</p>}
//   //       {content.publish_date && <p><span className="font-bold">Publish Date: </span>{content.publish_date}</p>}
//   //       {content.author && <p><span className="font-bold">Author: </span>{content.author}</p>}
//   //       {content.headline && <p><span className="font-bold">Summary: </span>{content.headline}</p>}
//   //       {content.response && <p><span className="font-bold">Response: </span>{content.response}</p>}
//   //     </div>
//   //   );
//   // };





// const renderAssistantContent = (content) => {
//     if (typeof content === 'string') return content;

//     const docs = content.response?.docs || [];
//     const totalFound = content.response?.found || "0";

//     return (
//       <div className={`space-y-6 ${
//         isDarkMode ? 'text-white' : 'text-gray-900'
//       }`}>
//         {/* Results Header */}
//         <div className={`text-sm ${
//           isDarkMode ? 'text-gray-400' : 'text-gray-600'
//         }`}>
//           Found: {totalFound}
//         </div>

//         {/* Documents List */}
//         {docs.map((doc, index) => (
//           <div 
//             key={index}
//             className={`border rounded-lg p-4 ${
//               isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-white'
//             }`}
//           >
//             {/* Header Section */}
//             <div className="flex justify-between items-start gap-4 mb-3">
//               <h3 className="font-semibold text-lg">{doc.title}</h3>
//               <div className={`text-sm shrink-0 ${
//                 isDarkMode ? 'text-gray-400' : 'text-gray-600'
//               }`}>
//                 {new Date(doc.publishdate).toLocaleDateString('en-US', {
//                   year: 'numeric',
//                   month: 'short',
//                   day: 'numeric'
//                 })}
//               </div>
//             </div>

//             {/* Court and Author Info */}
//             <div className="flex flex-wrap gap-x-6 gap-y-2 mb-3">
//               {doc.docsource && (
//                 <div className={`flex items-center gap-2 text-sm ${
//                   isDarkMode ? 'text-gray-300' : 'text-gray-700'
//                 }`}>
//                   <Building2 size={16} />
//                   {doc.docsource}
//                 </div>
//               )}
//               {doc.author && (
//                 <div className={`flex items-center gap-2 text-sm ${
//                   isDarkMode ? 'text-gray-300' : 'text-gray-700'
//                 }`}>
//                   <Book size={16} />
//                   {doc.author}
//                 </div>
//               )}
//             </div>

//             {/* Case Details */}
//             <div className="flex flex-wrap gap-x-6 gap-y-2 mb-3 text-sm">
//               {doc.numcites > 0 && (
//                 <div className={`flex items-center gap-1 ${
//                   isDarkMode ? 'text-gray-400' : 'text-gray-600'
//                 }`}>
//                   <Scale size={14} />
//                   Cites: {doc.numcites}
//                 </div>
//               )}
//               {doc.numcitedby > 0 && (
//                 <div className={`flex items-center gap-1 ${
//                   isDarkMode ? 'text-gray-400' : 'text-gray-600'
//                 }`}>
//                   <Link size={14} />
//                   Cited by: {doc.numcitedby}
//                 </div>
//               )}
//               {doc.citation && (
//                 <div className={`flex items-center gap-1 ${
//                   isDarkMode ? 'text-blue-400' : 'text-blue-600'
//                 }`}>
//                   <ExternalLink size={14} />
//                   {doc.citation}
//                 </div>
//               )}
//             </div>

//             {/* Headline/Summary */}
//             <div className={`mt-3 text-sm leading-relaxed ${
//               isDarkMode ? 'text-gray-300' : 'text-gray-700'
//             }`}>
//               <div 
//                 dangerouslySetInnerHTML={{ 
//                   __html: doc.headline.replace(/<b>/g, `<span class="${
//                     isDarkMode ? 'text-blue-400' : 'text-blue-600'
//                   } font-medium">`).replace(/<\/b>/g, '</span>')
//                 }} 
//               />
//             </div>
//           </div>
//         ))}
//       </div>
//     );
//   };





  
//   return (
//     <div className="flex h-screen" style={{ backgroundColor: isDarkMode ? '#212121' : '#ffffff' }}>
//       <div className="flex-1 flex flex-col relative">
//         <nav 
//           className={`border-b p-2 flex items-center justify-end sticky top-0 z-20 ${
//             isDarkMode ? 'border-gray-700' : 'border-gray-200'
//           }`}
//           style={{ backgroundColor: isDarkMode ? '#212121' : '#ffffff' }}
//         >
//           <div className="flex items-center gap-2">
//             <button onClick={toggleTheme} className={`p-2 rounded-md ${
//               isDarkMode ? 'hover:bg-gray-800 text-white' : 'hover:bg-gray-100 text-gray-800'
//             }`}>
//               {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
//             </button>
//             <button className={`p-2 rounded-md ${
//               isDarkMode ? 'hover:bg-gray-800 text-white' : 'hover:bg-gray-100 text-gray-800'
//             }`}>
//               <HelpCircle size={20} />
//             </button>
//           </div>
//         </nav>

//         <div className="flex-1 overflow-y-auto">
//           {isEmpty ? (
//             <div className="h-full flex flex-col justify-center items-center p-4">
//               <h1 className={`text-4xl font-bold text-center mb-8 ${
//                 isDarkMode ? 'text-white' : 'text-gray-800'
//               }`}>
//                 ChatGPT
//               </h1>
//               <div className="w-full max-w-2xl">
//                 <form onSubmit={handleSubmit} className="relative">
//                   <input
//                     type="text"
//                     value={input}
//                     onChange={(e) => setInput(e.target.value)}
//                     placeholder="Send a message..."
//                     className={`w-full p-4 pr-12 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-500 ${
//                       isDarkMode 
//                         ? 'border-gray-600 bg-gray-800 text-white placeholder-gray-400' 
//                         : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'
//                     }`}
//                   />
//                   <button 
//                     type="submit"
//                     disabled={!input.trim() || loading}
//                     className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 disabled:opacity-50 ${
//                       isDarkMode
//                         ? 'text-gray-400 hover:text-gray-200'
//                         : 'text-gray-500 hover:text-gray-700'
//                     }`}
//                   >
//                     <Send size={20} />
//                   </button>
//                 </form>
//               </div>
//             </div>
//           ) : (
//             <div className="flex">
//               <div className="flex-1">
//                 <div className="pb-32">
//                   {messages.map((message) => (
//                     <div key={message.id}>
//                       <div className="max-w-2xl ml-[200px] p-4">
//                         {message.role === 'assistant' ? (
//                           <div className="flex gap-4">
//                             <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white shrink-0 ${
//                               isDarkMode ? 'bg-gray-700' : 'bg-gray-600'
//                             }`}>
//                               <img 
//                                 src="https://infrahive-ai-search.vercel.app/Logo%20(Digest).png"
//                                 alt="Bot"
//                                 className="w-full h-full object-cover rounded-full"
//                               />
//                             </div>
//                             <div className="flex-1 space-y-2">
//                               <div className={isDarkMode ? 'text-white' : 'text-gray-900'}>
//                                 {renderAssistantContent(message.content)}
//                               </div>
//                               <div className="flex items-center gap-2 mt-2">
//                                 <button className={`p-1 rounded ${
//                                   isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
//                                 }`}>
//                                   <ThumbsUp size={16} />
//                                 </button>
//                                 <button className={`p-1 rounded ${
//                                   isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
//                                 }`}>
//                                   <ThumbsDown size={16} />
//                                 </button>
//                                 <button className={`p-1 rounded ${
//                                   isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
//                                 }`}>
//                                   <RotateCcw size={16} />
//                                 </button>
//                                 {message.content.resources && (
//                                   <button 
//                                     onClick={toggleSources}
//                                     className={`flex items-center gap-1 p-1 px-2 rounded border text-sm ${
//                                       isDarkMode 
//                                         ? 'border-white bg-gray-700 hover:bg-gray-800 text-blue-400 hover:text-blue-300' 
//                                         : 'border-black bg-gray-200 hover:bg-gray-100 text-blue-600 hover:text-blue-700'
//                                     }`}
//                                   >
//                                     <Link size={14} />
//                                     Sources ({message.content.resources.length})
//                                   </button>
//                                 )}
//                               </div>
//                             </div>
//                           </div>
//                         ) : (
//                           <div className="flex justify-end gap-4">
//                             <div className="max-w-[85%] space-y-2">
//                               <div className="bg-[#303030] text-white p-3 rounded-full">
//                                 {message.content}
//                               </div>
//                             </div>
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   ))}
//                   {loading && (
//                     <div className="max-w-2xl ml-[200px] p-4 flex gap-4">
//                       <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white">
//                           <Bot size={16} />
//                           <img  src="https://infrahive-ai-search.vercel.app/Logo%20(Digest).png"/>
//                       </div>
//                       <div className="flex items-center">
//                         <Loader className="animate-spin" size={16} />
//                       </div>
//                     </div>
//                   )}
//                   <div ref={messagesEndRef} />
//                 </div>

//                 <div 
//                   className={`fixed left-[47%] transform -translate-x-1/2 bottom-0 w-full p-4 z-10 ${
//                     isDarkMode ? 'border-gray-700' : 'border-gray-200'
//                   }`}
//                   style={{ backgroundColor: isDarkMode ? '#212121' : '#ffffff' }}
//                 >
//                   <div className="max-w-2xl mx-auto">
//                     <form onSubmit={handleSubmit} className="relative">
//                       <input
//                         type="text"
//                         value={input}
//                         onChange={(e) => setInput(e.target.value)}
//                         placeholder="Send a message..."
//                         className={`w-full p-4 pr-12 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-500 ${
//                           isDarkMode 
//                             ? 'border-gray-600 bg-gray-800 text-white placeholder-gray-400' 
//                             : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'
//                         }`}
//                       />
//                       <button 
//                         type="submit"
//                         disabled={!input.trim() || loading}
//                         className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 disabled:opacity-50 ${
//                           isDarkMode
//                             ? 'text-gray-400 hover:text-gray-200'
//                             : 'text-gray-500 hover:text-gray-700'
//                         }`}
//                       >
//                         <Send size={20} />
//                       </button>
//                     </form>
//                   </div>
//                 </div>
//               </div>

//               {showSources && currentResources.length > 0 && (
//                 <div 
//                   className={`w-72 border-l p-4 overflow-y-auto fixed right-0 top-0 h-screen z-40 ${
//                     isDarkMode ? 'border-gray-700 bg-[#212121] text-white' : 'border-gray-200 bg-white text-gray-900'
//                   }`}
//                 >
//                   <div className="space-y-4 pb-24">
//                     <div className="flex items-center justify-between">
//                       <h2 className="text-lg font-semibold flex items-center gap-2">
//                         <Link size={20} />
//                         Sources
//                       </h2>
//                       <button 
//                         onClick={toggleSources}
//                         className={`p-1 rounded-full ${
//                           isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
//                         }`}
//                       >
//                         ×
//                       </button>
//                     </div>
//                     {currentResources.map((resource, index) => (
//                       <div
//                         key={index}
//                         className={`space-y-2 p-3 rounded-lg border ${
//                           isDarkMode 
//                             ? 'border-gray-700 bg-gray-800/50' 
//                             : 'border-gray-200 bg-gray-50'
//                         }`}
//                       >
//                         <div className="font-medium">
//                           {resource.meta_title}
//                         </div>
//                         <div className="text-sm text-gray-500 dark:text-gray-400">
//                           {resource.heading}
//                         </div>
//                         <a
//                           href={resource.link}
//                           className={`flex items-center gap-2 mt-2 text-sm ${
//                             isDarkMode 
//                               ? 'text-blue-400 hover:text-blue-300' 
//                               : 'text-blue-600 hover:text-blue-700'
//                           }`}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                         >
//                           <ExternalLink size={14} />
//                           View source
//                         </a>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DraftChat;







import { useState, useRef, useEffect } from 'react';
import { 
  Sun, Moon, HelpCircle, Bot, ThumbsUp, 
  ThumbsDown, RotateCcw, Send, Loader, Link, ExternalLink,
  Scale, Book, Building2 
} from 'lucide-react';

const DraftChat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [currentResources, setCurrentResources] = useState([]);
  const [showSources, setShowSources] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (input.trim()) {
      setMessages(prev => [...prev, { 
        role: 'user', 
        content: input.trim(),
        id: prev.length + 1
      }]);
      setLoading(true);
      setInput('');
      setShowSources(false);

      try {
        const response = await fetch('/api/legal/research/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user_prompt: input.trim()
          })
        });

        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }

        const data = await response.json();
        console.log('API Response:', data);

        const formattedResponse = {
          role: 'assistant',
          content: {
            apiResponse: data,
            resources: data.response?.docs?.map(doc => ({
              title: doc.title,
              meta_title: doc.docsource,
              heading: doc.headline.replace(/<\/?b>/g, ''),
              link: `https://indiankanoon.org/doc/${doc.tid}/`
            })) || []
          },
          id: messages.length + 2
        };

        setMessages(prev => [...prev, formattedResponse]);
        setCurrentResources(formattedResponse.content.resources);
      } catch (error) {
        console.error('Error calling API:', error);
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: {
            apiResponse: {
              response: {
                docs: [{
                  title: 'Error',
                  publishdate: new Date().toISOString(),
                  author: 'System',
                  headline: `Error: ${error.message}. Please try again.`,
                  docsource: 'Error'
                }],
                found: '0'
              }
            },
            resources: []
          },
          id: prev.length + 2
        }]);
      } finally {
        setLoading(false);
      }
    }
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleSources = () => {
    setShowSources(!showSources);
  };

  const isEmpty = messages.length === 0 && !loading;

  const renderAssistantContent = (content) => {
    if (typeof content === 'string') return content;

    const docs = content.apiResponse?.response?.docs || [];
    const totalFound = content.apiResponse?.response?.found || "0";

    return (
      <div className={`space-y-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
        {/* Results Header */}
        <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Found: {totalFound}
        </div>

        {/* Documents List */}
        {docs.map((doc, index) => (
          <div 
            key={index}
            className={`border rounded-lg p-4 ${
              isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-white'
            }`}
          >
            {/* Title and Date */}
            <div className="flex justify-between items-start gap-4 mb-3">
              <a 
                href={`https://indiankanoon.org/doc/${doc.tid}/`}
                target="_blank"
                rel="noopener noreferrer"
                className={`font-semibold text-lg hover:underline ${
                  isDarkMode ? 'text-blue-400' : 'text-blue-600'
                }`}
              >
                {doc.title}
              </a>
              <div className={`text-sm shrink-0 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {new Date(doc.publishdate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
            </div>

            {/* Source and Author */}
            <div className="flex flex-wrap gap-x-6 gap-y-2 mb-3">
              {doc.docsource && (
                <div className={`flex items-center gap-2 text-sm ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  <Building2 size={16} />
                  {doc.docsource}
                </div>
              )}
              {doc.author && (
                <div className={`flex items-center gap-2 text-sm ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  <Book size={16} />
                  {doc.author}
                </div>
              )}
            </div>

            {/* Citations */}
            <div className="flex flex-wrap gap-x-6 gap-y-2 mb-3">
              {doc.numcites > 0 && (
                <div className={`flex items-center gap-2 text-sm ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  <Scale size={14} />
                  Citations: {doc.numcites}
                </div>
              )}
              {doc.numcitedby > 0 && (
                <div className={`flex items-center gap-2 text-sm ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  <Link size={14} />
                  Cited by: {doc.numcitedby}
                </div>
              )}
            </div>

            {/* Content */}
            <div className={`mt-4 text-sm leading-relaxed ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              <div 
                dangerouslySetInnerHTML={{ 
                  __html: doc.headline.replace(/<b>/g, `<span class="${
                    isDarkMode ? 'text-blue-400 font-medium' : 'text-blue-600 font-medium'
                  }">`).replace(/<\/b>/g, '</span>')
                }} 
              />
            </div>

            {/* Citation */}
            {doc.citation && (
              <div className={`mt-3 text-sm ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Citation: {doc.citation}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="flex h-screen" style={{ backgroundColor: isDarkMode ? '#212121' : '#ffffff' }}>
      <div className="flex-1 flex flex-col relative">
        {/* Navigation Bar */}
        <nav 
          className={`border-b p-2 flex items-center justify-end sticky top-0 z-20 ${
            isDarkMode ? 'border-gray-700' : 'border-gray-200'
          }`}
          style={{ backgroundColor: isDarkMode ? '#212121' : '#ffffff' }}
        >
          <div className="flex items-center gap-2">
            <button onClick={toggleTheme} className={`p-2 rounded-md ${
              isDarkMode ? 'hover:bg-gray-800 text-white' : 'hover:bg-gray-100 text-gray-800'
            }`}>
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button className={`p-2 rounded-md ${
              isDarkMode ? 'hover:bg-gray-800 text-white' : 'hover:bg-gray-100 text-gray-800'
            }`}>
              <HelpCircle size={20} />
            </button>
          </div>
        </nav>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          {isEmpty ? (
            // Empty State
            <div className="h-full flex flex-col justify-center items-center p-4">
              <h1 className={`text-4xl font-bold text-center mb-8 ${
                isDarkMode ? 'text-white' : 'text-gray-800'
              }`}>
                Legal Research Assistant
              </h1>
              <div className="w-full max-w-2xl">
                <form onSubmit={handleSubmit} className="relative">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about legal cases..."
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
            // Chat Interface
            <div className="flex">
              <div className="flex-1">
                <div className="pb-32">
                  {messages.map((message) => (
                    <div key={message.id}>
                      <div className="max-w-2xl ml-[200px] p-4">
                        {message.role === 'assistant' ? (
                          <div className="flex gap-4">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white shrink-0 ${
                              isDarkMode ? 'bg-gray-700' : 'bg-gray-600'
                            }`}>
                              <img 
                                src="https://infrahive-ai-search.vercel.app/Logo%20(Digest).png"
                                alt="Bot"
                                className="w-full h-full object-cover rounded-full"
                              />
                            </div>
                            <div className="flex-1 space-y-2">
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
                                {message.content.resources?.length > 0 && (
                                  <button 
                                    onClick={toggleSources}
                                    className={`flex items-center gap-1 p-1 px-2 rounded border text-sm ${
                                      isDarkMode 
                                        ? 'border-white bg-gray-700 hover:bg-gray-800 text-blue-400 hover:text-blue-300' 
                                        : 'border-black bg-gray-200 hover:bg-gray-100 text-blue-600 hover:text-blue-700'
                                    }`}
                                  >
                                    <Link size={14} />
                                    Sources ({message.content.resources.length})
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="flex justify-end gap-4">
                            <div className="max-w-[85%] space-y-2">
                              <div className="bg-[#303030] text-white p-3 rounded-full">
                                {message.content}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  {loading && (
                    <div className="max-w-2xl ml-[200px] p-4 flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white">
                        <Bot size={16} />
                      </div>
                      <div className="flex items-center">
                        <Loader className="animate-spin" size={16} />
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input Box */}
                <div 
                  className={`fixed left-[47%] transform -translate-x-1/2 bottom-0 w-full p-4 z-10 ${
                    isDarkMode ? 'border-gray-700' : 'border-gray-200'
                  }`}
                  style={{ backgroundColor: isDarkMode ? '#212121' : '#ffffff' }}
                >
                  <div className="max-w-2xl mx-auto">
                    <form onSubmit={handleSubmit} className="relative">
                      <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask about legal cases..."
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
              </div>

              {/* Sources Panel */}
              {showSources && currentResources.length > 0 && (
                <div 
                  className={`w-72 border-l p-4 overflow-y-auto fixed right-0 top-0 h-screen z-40 ${
                    isDarkMode ? 'border-gray-700 bg-[#212121] text-white' : 'border-gray-200 bg-white text-gray-900'
                  }`}
                >
                  <div className="space-y-4 pb-24">
                    <div className="flex items-center justify-between">
                      <h2 className="text-lg font-semibold flex items-center gap-2">
                        <Link size={20} />
                        Sources
                      </h2>
                      <button 
                        onClick={toggleSources}
                        className={`p-1 rounded-full ${
                          isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
                        }`}
                      >
                        ×
                      </button>
                    </div>
                    {currentResources.map((resource, index) => (
                      <div
                        key={index}
                        className={`space-y-2 p-3 rounded-lg border ${
                          isDarkMode 
                            ? 'border-gray-700 bg-gray-800/50' 
                            : 'border-gray-200 bg-gray-50'
                        }`}
                      >
                        <div className="font-medium">
                          {resource.meta_title}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {resource.heading}
                        </div>
                        <a
                          href={resource.link}
                          className={`flex items-center gap-2 mt-2 text-sm ${
                            isDarkMode 
                              ? 'text-blue-400 hover:text-blue-300' 
                              : 'text-blue-600 hover:text-blue-700'
                          }`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink size={14} />
                          View source
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DraftChat;