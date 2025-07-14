import React, { useState } from "react";
import ChatBot from './ChatBot'
import { BotMessageSquare } from "lucide-react"; 

const ChatWidget = () => {
  const [open, setOpen] = useState(false);

  const toggleChat = () => {
    setOpen((prev) => !prev);
  };

  return (
    <>

      <button
        onClick={toggleChat}
        className="fixed bottom-5 right-5 bg-purple-600 hover:bg-purple-700 text-white p-4 rounded-full shadow-lg z-50"
      >
        <BotMessageSquare size={24} />
      </button>

      {/* Chat Popup */}
      {open && (
        <div className="fixed bottom-20 right-5 z-40 w-[370px] max-h-[600px] shadow-xl l-5">
          <ChatBot/>
        </div>
      )}
    </>
  );
};

export default ChatWidget;
