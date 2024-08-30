import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { useAuthstore } from '../store/authUser';

const socket = io('http://localhost:5000');  // Replace with your server URL

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
    <div className='flex-1 relative z-10'>
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="w-full max-w-4xl h-3/4 flex flex-col bg-white rounded-lg shadow-lg">
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((msg, index) => (
              <div 
                key={index} 
                className={`flex ${msg.username === username ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className="max-w-md px-4 py-2 rounded-lg bg-blue-100 text-blue-900"
                >
                  <p className="font-semibold mb-1">
                    {msg.username === username ? 'You' : msg.username}
                  </p>
                  <p>{msg.message}</p>
                </div>
              </div>
            ))}
          </div>
          <form onSubmit={sendMessage} className="border-t border-gray-200 p-4">
            <div className="flex space-x-3">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                className="text-black flex-1 bg-gray-100 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Type a message..."
              />
              <button 
                type="submit"
                className="bg-blue-500 text-white rounded-full px-6 py-2 font-semibold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
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