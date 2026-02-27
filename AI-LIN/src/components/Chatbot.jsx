import React, { useState, useRef, useEffect } from 'react';

const Chatbot = ({ backendUrl = 'http://localhost:5005', primaryColor = '#3b82f6' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch(`${backendUrl}/webhooks/rest/webhook`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sender: 'user123', // En un caso real se usaría un ID de sesión
          message: input,
        }),
      });

      const data = await response.json();
      data.forEach(botMsg => {
        setMessages(prev => [...prev, { text: botMsg.text, sender: 'bot' }]);
      });
    } catch (error) {
      console.error('Error al comunicar con el bot:', error);
      setMessages(prev => [...prev, { text: 'Error de conexión', sender: 'bot' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full flex items-center justify-center text-white shadow-lg"
          style={{ backgroundColor: primaryColor }}
        >
          💬
        </button>
      ) : (
        <div className="w-80 h-96 bg-white rounded-lg shadow-xl flex flex-col overflow-hidden border">
          <div className="p-3 flex justify-between items-center" style={{ backgroundColor: primaryColor }}>
            <span className="font-bold text-white">Asistente Virtual</span>
            <button onClick={() => setIsOpen(false)} className="text-white">✕</button>
          </div>

          <div className="flex-1 p-3 overflow-y-auto">
            {messages.map((msg, idx) => (
              <div key={idx} className={`mb-2 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                <span
                  className={`inline-block p-2 rounded-lg ${
                    msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200'
                  }`}
                >
                  {msg.text}
                </span>
              </div>
            ))}
            {loading && <div className="text-left">...</div>}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-2 border-t flex">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              className="flex-1 border rounded-l-lg px-3 py-2 focus:outline-none"
              placeholder="Escribe tu mensaje..."
            />
            <button
              onClick={sendMessage}
              className="px-4 py-2 text-white rounded-r-lg"
              style={{ backgroundColor: primaryColor }}
            >
              Enviar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;