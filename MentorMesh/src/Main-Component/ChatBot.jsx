import React, { useState } from "react";
import axios from "axios";
import API_BASE_URL from "../config";

const ChatBox = () => {
  const [input, setInput] = useState("");
  const [chat, setChat] = useState([]);

  const handleSend = async () => {
    if (!input.trim()) return;
    setChat([...chat, { sender: "user", text: input }]);
    
    setInput("");
    try {
      const res = await axios.post(`${API_BASE_URL}/api/chat/`, {
        message: input,
      });
      setChat((prev) => [...prev, { sender: "bot", text: res.data.response }]);
    } catch (err) {
      setChat((prev) => [...prev, { sender: "bot", text: "Something went wrong!" }]);
      console.error("Error:", err);
    }
  };

  return (
    <div className="fixed bottom-5 right-21 w-100 shadow-xl rounded-xl border border-gray-200 overflow-hidden bg-white flex flex-col mb-8">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-purple-600 text-white">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" title="Online"></div>
          <span className="font-semibold">MentorBot</span>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
        {chat.map((msg, i) => (
          <div key={i} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"} mb-2`}>
            <div
              className={`max-w-[70%] px-4 py-2 rounded-lg ${
                msg.sender === "user"
                  ? "bg-purple-500 text-white rounded-br-none"
                  : "bg-white border rounded-bl-none"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Quick Replies */}
      {chat.length === 0 && (
        <div className="flex gap-2 px-4 py-2 bg-purple-100 text-sm text-purple-800">
          <button className="bg-white border px-3 py-1 rounded hover:bg-purple-200" onClick={() => setInput("Tell About MentorMesh")}>About MentorMesh</button>

        </div>
      )}

      {/* Input Field */}
      <div className="flex items-center p-3 border-t bg-white">
        <button className="mr-2 text-xl">😊</button>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Type your message..."
          className="flex-1 border rounded-full px-4 py-2 outline-none text-sm"
        />
        <button
          onClick={handleSend}
          className="ml-2 bg-purple-500 text-white px-4 py-2 rounded-full hover:bg-purple-700"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
