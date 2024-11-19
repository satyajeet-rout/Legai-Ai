const handleSubmit = async (e) => {
    e.preventDefault();
    if (input.trim()) {
      const userMessageId = messageIdCounter;
      setMessageIdCounter(prev => prev + 1);

      setMessages(prev => [...prev, { 
        role: 'user', 
        content: input.trim(),
        id: userMessageId
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
        console.log('Raw API Response:', data); // Debug log

        // Ensure data has the correct structure
        if (!data || (!data.docs && !data.response?.docs)) {
          throw new Error('Invalid response format');
        }

        const assistantMessageId = messageIdCounter + 1;
        setMessageIdCounter(prev => prev + 1);

        // Handle both possible data structures
        let processedDocs;
        if (data.response && data.response.docs) {
          processedDocs = data.response.docs;
        } else if (Array.isArray(data.docs)) {
          processedDocs = data.docs;
        } else if (Array.isArray(data)) {
          processedDocs = data;
        } else {
          processedDocs = [];
        }

        console.log('Processed docs:', processedDocs); // Debug log

        const formattedResponse = {
          role: 'assistant',
          content: {
            apiResponse: {
              response: {
                docs: processedDocs,
                found: processedDocs.length.toString()
              }
            },
            resources: processedDocs.map(doc => ({
              title: doc.title || 'Untitled',
              meta_title: doc.docsource || 'Unknown Source',
              heading: doc.headline ? doc.headline.replace(/<\/?b>/g, '') : '',
              link: doc.tid ? `https://indiankanoon.org/doc/${doc.tid}/` : '#'
            }))
          },
          id: assistantMessageId
        };

        console.log('Formatted Response:', formattedResponse); // Debug log
        
        setMessages(prev => [...prev, formattedResponse]);
        setCurrentResources(formattedResponse.content.resources);
      } catch (error) {
        console.error('Error:', error);
        const errorMessageId = messageIdCounter + 1;
        setMessageIdCounter(prev => prev + 1);
        
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
                  docsource: 'Error',
                  tid: 'error'
                }],
                found: '0'
              }
            },
            resources: []
          },
          id: errorMessageId
        }]);
      } finally {
        setLoading(false);
      }
    }
};

const renderAssistantContent = (content) => {
    console.log('Rendering content:', content); // Debug log

    if (typeof content === 'string') return content;

    // Safely access docs array
    const docs = content?.apiResponse?.response?.docs;
    console.log('Docs to render:', docs); // Debug log

    if (!Array.isArray(docs) || docs.length === 0) {
      return (
        <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          No results found.
        </div>
      );
    }

    return (
      <div className={`space-y-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
        <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Found: {docs.length} results
        </div>

        {docs.map((doc, index) => {
          if (!doc) return null;
          
          return (
            <div 
              key={`${doc.tid || index}-${index}`}
              className={`border rounded-lg p-4 ${
                isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-white'
              }`}
            >
              <div className="flex justify-between items-start gap-4 mb-3">
                <a 
                  href={doc.tid ? `https://indiankanoon.org/doc/${doc.tid}/` : '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`font-semibold text-lg hover:underline ${
                    isDarkMode ? 'text-blue-400' : 'text-blue-600'
                  }`}
                >
                  {doc.title || 'Untitled Document'}
                </a>
                {doc.publishdate && (
                  <div className={`text-sm shrink-0 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {new Date(doc.publishdate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                )}
              </div>

              {/* Only render sections if data exists */}
              {(doc.docsource || doc.author) && (
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
              )}

              {/* Citations section */}
              {(doc.numcites > 0 || doc.numcitedby > 0) && (
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
              )}

              {/* Content section */}
              {doc.headline && (
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
              )}

              {doc.citation && (
                <div className={`mt-3 text-sm ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Citation: {doc.citation}
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
};