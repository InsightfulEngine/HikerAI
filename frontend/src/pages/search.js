import React, { useState, useRef } from "react";
import { FaSearch, FaSpinner, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import logo from "../images/hikerai.png";

function SearchPage() {
  const [chatMessages, setChatMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [showScrollbar, setShowScrollbar] = useState(false);
  const textareaRef = useRef(null);
  const chatContainerRef = useRef(null);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setInputMessage(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = "60px";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      setShowScrollbar(textareaRef.current.scrollHeight > 150);
    }
  };


  const handleSendMessage = async () => {
    if (inputMessage.trim() !== "") {
      const newUserMessage = { text: inputMessage.trim(), isUser: true };
      setChatMessages((prevMessages) => [...prevMessages, newUserMessage]);
      setInputMessage("");
      setIsSearching(true);
      
      const response = await fetch("http://localhost:5000/invoke", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ message: inputMessage.trim() })});
      if (!response.ok) {
        throw new Error("response not ok");
      }
      const data = await response.json();
      setTimeout(() => {
        const botResponse = {
          name: data.name,
          location: data.address,
          difficulty: data.difficulty,
          ratings: data.ratings,
          description: data.description,
          reviews: data.reviews,
          image:
            data.image,
        };

        const botResponseMessage = {
          response: botResponse,
          isUser: false,
        };

        setTimeout(() => {
          setChatMessages((prevMessages) => [
            ...prevMessages,
            botResponseMessage,
          ]);
          setIsSearching(false);
        }, 1000);
      }, 500);
    }
    if (textareaRef.current) {
      textareaRef.current.style.height = "60px";
      setShowScrollbar(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const isSearchDisabled = inputMessage.trim() === "";

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white relative">
      <header className="py-4 px-6 bg-gray-800 text-white text-lg font-semibold flex justify-center items-center">
        <FaArrowLeft
          className="absolute left-4 cursor-pointer"
          onClick={() => navigate("/")}
        />
        HikerAI Assistant
      </header>
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto px-[10%] py-8 pb-[120px] whitespace-pre-wrap"
      >
        {chatMessages.length === 0 ? ( // Conditionally render "HikerAI" if no chat history exists
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="flex justify-center items-center">
              <img src={logo} alt="logo" className="relative" />
            </div>
          </div>
        ) : (
          chatMessages.map((message, index) => (
            <div
              key={index}
              className={`mb-4 ${
                message.isUser ? "justify-end" : "justify-start"
              }`}
            >
              {message.isUser ? (
                <div>
                  <p className="text-md text-gray-300 font-bold">You</p>
                  <div className="rounded-lg py-3 px-4 m-1 max-w-full bg-blue-600 text-white">
                    {message.text && <div>{message.text}</div>}
                  </div>
                </div>
              ) : (
                <div>
                  <p className="text-md text-gray-300 font-bold">HikerAI</p>
                  <div className="rounded-lg overflow-hidden m-1 bg-gray-800">
                    {message.response && (
                      <div className="flex flex-col xl:flex-row">
                        <img
                          src={message.response.image}
                          alt="Trail"
                          className="h-full w-auto xl:h-auto xl:w-1/2 object-cover"
                        />
                        <div className="p-5 flex flex-col justify-center">
                          <h2 className="text-2xl font-semibold mb-3">
                            {message.response.name}
                          </h2>
                          <p className="text-sm mb-3">
                            <strong>Location:</strong>{" "}
                            {message.response.location}
                          </p>
                          <p className="text-sm mb-3">
                            <strong>Difficulty:</strong>{" "}
                            {message.response.difficulty}
                          </p>
                          <p className="text-sm mb-3">
                            <strong>Rating:</strong> {message.response.ratings}
                          </p>
                          <p className="text-sm mb-3">
                            <strong>Reviews </strong>{" "}
                            {message.response.reviews}
                          </p>
                          <p className="text-sm">
                            <strong>Description:</strong>{" "}
                            {message.response.description}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      <div className="fixed bottom-0 left-0 right-0 flex items-center justify-center px-6 py-4 bg-gray-900 transition duration-300">
        <div className="relative w-full lg:w-[80%] xl:w-[50%]">
          <textarea
            ref={textareaRef}
            className="w-full text-sm sm:text-lg py-2 px-4 bg-gray-700 text-white border border-gray-700 rounded-2xl focus:outline-none resize-none hover:bg-gray-700"
            placeholder="Search a hiking trail..."
            value={inputMessage}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            style={{
              minHeight: "60px",
              maxHeight: "150px",
              height: "60px",
              overflowY: showScrollbar ? "auto" : "hidden",
              scrollbarWidth: "thin",
              scrollbarColor: "rgba(128, 128, 128, 0.5) rgba(0, 0, 0, 0)",
              scrollbarTrackColor: "rgba(255, 255, 255, 0.1)",
              lineHeight: "40px",
            }}
          />
          <button
            className={`absolute right-2 bottom-4 sm:bottom-[1.1rem] ml-2 px-3 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 focus:outline-none ${
              isSearchDisabled && "opacity-50 cursor-not-allowed"
            }`}
            onClick={handleSendMessage}
            disabled={isSearchDisabled}
          >
            {isSearching ? (
              <FaSpinner className="animate-spin" />
            ) : (
              <FaSearch />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
