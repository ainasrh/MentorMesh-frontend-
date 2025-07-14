import React, { useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from "../config";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const ChatHome = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [listUser, setListUser] = useState([]);
  const [socket, setSocket] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState(null);

  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/user/users/`);
        setListUser(response.data);
      } catch (err) {
        console.log("Error fetching users", err);
      }
    };

    const fetchMe = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/user/users/me/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setLoggedInUser(response.data);
      } catch (err) {
        console.log("Error fetching logged-in user", err);
      }
    };

    fetchMe();
    fetchUsers();
  }, [token]);

  const handleUserClick = async (user) => {
    setSelectedUser(user);
    setMessages([]);

    try {
      const res = await axios.post(
        `${API_BASE_URL}/chat/create-room/`,
        { target_user_id: user.id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const room = res.data.room_id;

      if (socket) socket.close();

      const ws = new WebSocket(
        `ws://localhost:8005/ws/chat/${room}/?token=${token}`
      );

      ws.onopen = () => {
        console.log("WebSocket connected to room:", room);
      };

      try {
        const response = await axios.get(
          `${API_BASE_URL}/chat/messages/${room}/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const chatHistory = response.data;
        setMessages(
          chatHistory.map((obj) => ({
            text: obj.content,
            sender: obj.sender,
            timestamp: obj.timestamp,
          }))
        );
      } catch (error) {
        toast.error("Failed to fetch messages");
      }

      ws.onmessage = (e) => {
        const data = JSON.parse(e.data);
        setMessages((prev) => [
          ...prev,
          {
            text: data.message,
            timestamp: new Date().toTimeString().slice(0, 5),
            sender: data.sender,
          },
        ]);
      };

      ws.onclose = () => console.log("WebSocket disconnected");
      ws.onerror = (error) => console.error("WebSocket error:", error);

      setSocket(ws);
    } catch (err) {
      console.error("Error creating room", err);
    }
  };

  const handleSend = () => {
    if (input.trim() === "") return;
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ message: input }));
      setInput("");
    } else {
      console.warn("WebSocket not connected");
    }
  };

  useEffect(() => {
    const chatBox = document.getElementById("chat-box");
    if (chatBox) chatBox.scrollTop = chatBox.scrollHeight;
  }, [messages]);

  useEffect(() => {
    return () => {
      if (socket) socket.close();
    };
  }, [socket]);

  return (
    <div className="w-[80vw] h-[90vh] bg-[#f8f9fb] shadow-lg rounded-lg ml-auto mr-10 mt-10 flex font-sans">
      {/* Sidebar */}
      <div className="w-[25%] bg-white border-r border-gray-200 p-4 flex flex-col">
        <h1 className="text-xl font-bold mb-4 text-purple-700">Chat ONN</h1>
        <div className="overflow-y-auto flex-1">
          {listUser
            .filter(
              (u) =>
                loggedInUser && u.id !== loggedInUser.id && u.role !== "admin"
            )
            .map((user) => (
              <div
                key={user.id}
                onClick={() => handleUserClick(user)}
                className={`flex items-center gap-3 p-2 rounded-lg mb-2 cursor-pointer hover:bg-purple-100 transition ${
                  selectedUser?.id === user.id ? "bg-purple-200" : ""
                }`}
              >
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-sm font-semibold text-gray-600">
                    {user.username.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-800">
                    {user.username}
                  </div>
                  <div className="text-xs text-gray-500">Click to chat</div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Chat Section */}
      {selectedUser ? (
        <div className="w-[50%] flex flex-col border-r border-gray-200">
          {/* Header */}
          <div className="bg-white p-4 border-b flex items-center gap-3 shadow-sm">
            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-sm font-semibold text-gray-600">
                {selectedUser.username.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-gray-800">
                {selectedUser.username}
              </span>
              <span className="text-xs text-gray-500">
                {selectedUser.role}
              </span>
            </div>
          </div>

          {/* Chat messages */}
          <div
            id="chat-box"
            className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#f4f4f9]"
          >
            {messages.length === 0 && (
              <div className="text-center text-gray-500 text-sm mt-10">
                Start a conversation with {selectedUser.username}
              </div>
            )}
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${
                  msg.sender === loggedInUser?.id
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-2xl text-sm shadow-md ${
                    msg.sender === loggedInUser?.id
                      ? "bg-purple-600 text-white rounded-br-none"
                      : "bg-white text-gray-800 border border-gray-300 rounded-bl-none"
                  }`}
                >
                  <strong className="block mb-1 text-xs opacity-70">
                    {msg.timestamp.slice(0, 5)}
                  </strong>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input field */}
          <div className="bg-white p-4 border-t flex gap-2">
            <input
              type="text"
              className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring focus:ring-purple-200"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button
              onClick={handleSend}
              className="bg-purple-600 text-white px-4 py-2 rounded-full hover:bg-purple-700 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Send
            </button>
          </div>
        </div>
      ) : (
        <div className="w-[50%] flex items-center justify-center text-gray-500 text-sm">
          Select a user to start chatting
        </div>
      )}
    </div>
  );
};

export default ChatHome;
