import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { useAuthstore } from '../store/authUser';
import { PawPrint, Send } from 'lucide-react';

const socket = io('http://localhost:5000');  // Replace with your server URL

// Cute paw print background component
const PawPrintBackground = () => (
  <div className="absolute inset-0 opacity-5 pointer-events-none">
    {[...Array(20)].map((_, i) => (
      <PawPrint
        key={i}
        className="absolute text-pink-300"
        style={{
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          transform: `rotate(${Math.random() * 360}deg)`,
          width: `${Math.random() * 30 + 20}px`,
          height: `${Math.random() * 30 + 20}px`,
        }}
      />
    ))}
  </div>
);

const ChatComponent = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const { user } = useAuthstore();
  const username = user.username;

  useEffect(() => {
    // Listen for incoming messages
    socket.on('chat message', (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    // Cleanup on component unmount
    return () => {
      socket.off('chat message');
    };
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    if (inputMessage.trim()) {
      // Send message to server
      socket.emit('chat message', { message: inputMessage, username });
      setInputMessage('');
    }
  };

  return (
    <div className='flex-1 overflow-auto relative z-10'>
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-100 to-pink-100 p-4">
        <PawPrintBackground />
        <div className="w-full max-w-4xl h-[600px] flex flex-col bg-white bg-opacity-90 rounded-3xl shadow-lg overflow-hidden relative z-10">
          <div className="bg-gradient-to-r from-purple-400 to-pink-400 p-4 text-white">
            <h2 className="text-2xl font-bold flex items-center">
              <PawPrint className="w-6 h-6 mr-2" />
              Pawsome Chat
            </h2>
          </div>
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((msg, index) => (
              <div 
                key={index} 
                className={`flex ${msg.username === username ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-md px-4 py-2 rounded-2xl ${
                    msg.username === username 
                      ? 'bg-pink-100 text-pink-900' 
                      : 'bg-purple-100 text-purple-900'
                  }`}
                >
                  <p className="font-semibold mb-1 flex items-center">
                    <PawPrint className="w-4 h-4 mr-1" />
                    {msg.username === username ? 'You' : msg.username}
                  </p>
                  <p>{msg.message}</p>
                </div>
              </div>
            ))}
          </div>
          <form onSubmit={sendMessage} className="border-t border-gray-200 p-4 bg-yellow-50">
            <div className="flex space-x-3">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                className="flex-1 bg-white border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                placeholder="Type your pawsome message..."
              />
              <button 
                type="submit"
                className="bg-pink-500 text-white rounded-full px-6 py-2 font-semibold hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500 flex items-center"
              >
                <Send className="w-4 h-4 mr-2" />
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatComponent;