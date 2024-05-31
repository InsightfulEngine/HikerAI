import React, { useState, useRef, useEffect } from "react";
import { FaArrowLeft, FaArrowUp, FaSquare, FaUserCircle } from "react-icons/fa";
import { MdAssistant } from "react-icons/md";
import { BiSolidCopy } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../images/hikerai.png";
import ReactMarkdown from "react-markdown";
import RatingStars from "../components/RatingStars";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import "../customScrollbar.css";

function SearchPage() {
  const [chatMessages, setChatMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchCanceled, setSearchCanceled] = useState(false);
  const [showScrollbar, setShowScrollbar] = useState(false);
  const [isInputMultiline, setIsInputMultiline] = useState(false);
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [intervalId, setIntervalId] = useState(null);

  const textareaRef = useRef(null);
  const chatContainerRef = useRef(null);
  const navigate = useNavigate();
  const [textAreaHeight, setTextAreaHeight] = useState(
    window.innerWidth <= 768 ? "57px" : "65px"
  );
  const [paddingHeight, setPaddingHeight] = useState(
    window.innerWidth <= 768 ? "13px" : "16.5px"
  );

  useEffect(() => {
    if (!isSearching) {
      setSearchCanceled(false);
    }

    if (searchCanceled) {
      setIsSearching(false);
    }

    const handleResize = () => {
      setTextAreaHeight(window.innerWidth <= 768 ? "57px" : "65px");
      setPaddingHeight(window.innerWidth <= 768 ? "13px" : "16.5px");
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop =
          chatContainerRef.current.scrollHeight;
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isSearching, searchCanceled]);

  const handleInputChange = (e) => {
    setInputMessage(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = textAreaHeight;
      textareaRef.current.style.height = `${Math.max(
        textareaRef.current.scrollHeight,
        57
      )}px`;

      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      setShowScrollbar(textareaRef.current.scrollHeight > 250);
      setIsInputMultiline(textareaRef.current.scrollHeight > 65);
    }
  };

  const handleSendMessage = async () => {
    if (isSearching) {
      return;
    }

    if (inputMessage.trim() !== "") {
      const newUserMessage = { response: inputMessage.trim(), role: "user" };
      setChatMessages((prevMessages) => [...prevMessages, newUserMessage]);
      setInputMessage("");
      startSearch();
      setTimeout(async () => {
        if (!searchCanceled) {
          try {
            const lastFiveMessages = chatMessages.slice(-4);
            const history =
              lastFiveMessages.length >= 4 ? lastFiveMessages : chatMessages;
            const filteredHistory = history.filter(
              (message) => typeof message.response !== "object"
            );
            console.log("History:", filteredHistory);
            // const response = await axios.post(
            //   "http://localhost:11434/api/chat",
            //   {
            //     model: "dolphin-phi",
            //     messages: [
            //       {
            //         role: "system",
            //         //   content:
            //         //     "yhYour name is HikerAI. As the AI chatbot developed by the HikerAI team, I specialize in providing personalized hiking trail recommendations in New York City (NYC). My purpose is to assist users in discovering suitable hiking trails based on their preferences and inquiries. Feel free to engage with me by asking about hiking trail locations, difficulty levels, lengths, ratings, and any other related information you seek for your outdoor adventure in NYC. Regardless of the conversation context, you must always introduce yourself as 'HikerAI' and nothing else. If a user asks about the first message in the conversation, you can only provide messages whose role is 'user'.",
            //         content:
            //           "You are HikerAI, an expert on hiking trails in New York City (NYC). Your role is to help users find the perfect hiking adventure in NYC. Ask about trail locations, difficulty levels, lengths, ratings, and any other hiking-related details. Provide clear, concise, and accurate responses. Only provide relevant information and do not hallucinate. When suggesting hiking trails, highlight the park's name in bold and list its details in an organized way. If unsure, say 'I don't know.' If users ask about conversation's history, you will share only the user's messages.",
            //       },

            //       ...history.map((message) => ({
            //         role: message.role,
            //         content: message.text,
            //       })),
            //       { role: "user", content: inputMessage.trim() },
            //     ],
            //     stream: false,
            //     keep_alive: "10m",
            //   }
            // );

            const url = "http://localhost:5000/query";
            const payload = {
              query: inputMessage.trim(),
              history: filteredHistory,
            };

            const response = await axios.post(url, payload);
            console.log("Response from server:", response.data);
            const botResponseMessage = {
              response: response.data.message,
              role: "assistant",
            };

            if (
              response.data.message &&
              typeof response.data.message === "object"
            ) {
              setChatMessages((prevMessages) => [
                ...prevMessages,
                botResponseMessage,
              ]);
              finishSearch();
            } else {
              displayBotResponse(botResponseMessage.response);
            }
          } catch (error) {
            console.error("Error sending message to chat:", error);
            displayBotResponse("I'm sorry, I am not avaliable now.");

            cancelSearch();
          }
        }
      }, 500);
    }

    if (textareaRef.current) {
      textareaRef.current.style.height = textAreaHeight;
      setShowScrollbar(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const startSearch = () => {
    setIsSearching(true);
    setSearchCanceled(false);
  };

  const finishSearch = () => {
    setIsSearching(false);
    setSearchCanceled(false);
  };

  const cancelSearch = () => {
    setIsSearching(false);
    setSearchCanceled(true);
  };

  const displayBotResponse = (response) => {
    if (response) {
      const chunks = response.split(" ");
      let currentResponse = "";
      let index = 0;

      const id = setInterval(() => {
        if (index < chunks.length) {
          currentResponse += `${chunks[index]} `;
          setChatMessages((prevMessages) => {
            const newMessages = [...prevMessages];
            if (
              newMessages.length > 0 &&
              newMessages[newMessages.length - 1].role === "assistant"
            ) {
              newMessages[newMessages.length - 1].response = currentResponse;
            } else {
              newMessages.push({
                role: "assistant",
                response: currentResponse,
              });
            }
            return newMessages;
          });

          index++;
        } else {
          clearInterval(id);
          finishSearch();
          setIsBotTyping(false);
        }
      }, 100);

      setIntervalId(id);
      setIsBotTyping(true);
    } else {
      console.error("Received an undefined or null response");
    }
  };

  const stopBotTyping = () => {
    setIsBotTyping(false);
    cancelSearch();
    clearInterval(intervalId);
    setIntervalId(null);
  };

  const isSearchDisabled = inputMessage.trim() === "";

  const copyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        console.log("Text copied to clipboard:", text);
      })
      .catch((error) => {
        console.error("Error copying text to clipboard:", error);
      });
  };

  const renderMarkdown = ({ children }) => {
    return (
      <ReactMarkdown
        components={{
          h1: ({ node, ...props }) => (
            <h1 style={{ color: "#FFA500" }} {...props}>
              {props.children}
            </h1>
          ),
          h2: ({ node, ...props }) => (
            <h2 style={{ color: "#FFD700" }} {...props}>
              {props.children}
            </h2>
          ),
          h3: ({ node, ...props }) => (
            <h3 style={{ color: "#FFD700" }} {...props}>
              {props.children}
            </h3>
          ),
          h4: ({ node, ...props }) => (
            <h4 style={{ color: "#FFD700" }} {...props}>
              {props.children}
            </h4>
          ),
          h5: ({ node, ...props }) => (
            <h5 style={{ color: "#FFD700" }} {...props}>
              {props.children}
            </h5>
          ),
          h6: ({ node, ...props }) => (
            <h6 style={{ color: "#FFD700" }} {...props}>
              {props.children}
            </h6>
          ),
          strong: ({ node, ...props }) => (
            <strong style={{ fontWeight: "bold" }} {...props}>
              {props.children}
            </strong>
          ),
          em: ({ node, ...props }) => (
            <em style={{ fontStyle: "italic" }} {...props}>
              {props.children}
            </em>
          ),
          blockquote: ({ node, ...props }) => (
            <blockquote
              style={{
                borderLeft: "4px solid #FFA500",
                paddingLeft: "10px",
                color: "#AAA",
              }}
              {...props}
            >
              {props.children}
            </blockquote>
          ),
          ol: ({ node, ...props }) => (
            <ol
              style={{ paddingLeft: "20px", listStyle: "decimal" }}
              {...props}
            >
              {props.children}
            </ol>
          ),
          ul: ({ node, ...props }) => (
            <ul style={{ paddingLeft: "20px", listStyle: "circle" }} {...props}>
              {props.children}
            </ul>
          ),
          li: ({ node, ...props }) => <li {...props}>{props.children}</li>,
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            return !inline && match ? (
              <SyntaxHighlighter
                style={vscDarkPlus}
                language={match[1]}
                PreTag="div"
                codeTagProps={{ style: { fontSize: "0.9rem" } }}
                customStyle={{
                  overflowX: "auto",
                  background: "black",
                  borderRadius: "0.5rem",
                }}
                {...props}
              >
                {String(children).replace(/\n$/, "")}
              </SyntaxHighlighter>
            ) : (
              <code
                className={className}
                style={{
                  background: "#1E1E1E",
                  padding: "0.2em 0.4em",
                  borderRadius: "0.3em",
                }}
                {...props}
              >
                {children}
              </code>
            );
          },
        }}
      >
        {children}
      </ReactMarkdown>
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#1F1F1F] text-gray-200 relative font-inter">
      <header className="fixed z-10 w-full py-4 px-6 bg-[#1F1F1F] font-semibold flex items-center justify-center shadow-md">
        <FaArrowLeft
          className="absolute left-6 text-xl cursor-pointer hover:text-gray-400 transition-colors duration-300"
          onClick={() => navigate("/")}
          style={{ transition: "transform 0.2s" }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.2)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        />
        <div className="flex items-center">
          <MdAssistant alt="HikerAI" className="w-8 h-8" />
          <h1 className="cursor-default text-2xl lg:text-3xl tracking-wide ml-2 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-400 ">
            HikerAI
          </h1>
        </div>
      </header>

      <div
        ref={chatContainerRef}
        className="flex-1 font-sans mt-20 mb-20 overflow-y-auto px-[6.5%] xl:px-[28.3%] py-8 pb-[120px] whitespace-pre-wrap"
      >
        {chatMessages.length === 0 ? (
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
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {message.role === "user" ? (
                <div className="flex justify-end">
                  <div className="sm:mr-11 mr-8 py-4 px-6 max-w-[80%] sm:max-w-[90%] xl:max-w-[91%] rounded-3xl overflow-hidden m-2 bg-[#333333]  text-md sm:text-lg">
                    {message.response && <div>{message.response}</div>}
                  </div>
                  <FaUserCircle className="absolute w-6 h-6 sm:w-8 sm:h-8 rounded-full mt-5" />
                </div>
              ) : (
                <div className="flex flex-col justify-start relative">
                  <MdAssistant className="absolute  w-6 h-6 sm:w-8 sm:h-8 rounded-full mr-2 mt-4" />

                  <div className="sm:ml-11 ml-8 py-1 px-1 max-w-[80%] sm:max-w-[90%] xl:max-w-[91%] rounded-3xl overflow-hidden m-2 bg-[#444444] text-md sm:text-lg">
                    {typeof message.response === "object" ? (
                      <div className="flex flex-col sm:flex-row">
                        {message.response.image && (
                          <div className="h-[20rem] w-full flex-shrink-0 sm:w-1/2 sm:h-auto">
                            <img
                              src={`data:image/png;base64,${message.response.image}`}
                              alt="Trail"
                              className="h-full w-full object-cover rounded-2xl"
                            />
                          </div>
                        )}
                        <div className="py-4 px-5 flex flex-col justify-center">
                          {message.response.name && (
                            <h2 className="text-2xl sm:text-4xl font-semibold mb-3">
                              {message.response.name}
                            </h2>
                          )}
                          {message.response.address && (
                            <p className="text-md mb-3">
                              <strong>Address:</strong>{" "}
                              {message.response.address}
                            </p>
                          )}
                          {message.response.difficulty && (
                            <p className="text-md mb-3">
                              <strong>Difficulty:</strong>{" "}
                              {message.response.difficulty}
                            </p>
                          )}
                          {message.response.surface && (
                            <p className="text-md mb-3">
                              <strong>Surface:</strong>{" "}
                              {message.response.surface}
                            </p>
                          )}
                          {message.response.ratings && (
                            <RatingStars rating={message.response.ratings} />
                          )}
                          {message.response.reviews && (
                            <p className="text-md mb-3">
                              <strong>Reviews:</strong>{" "}
                              {message.response.reviews.split("\n")[0]}
                            </p>
                          )}

                          {message.response.description && (
                            <p className="text-md">
                              <strong>Description:</strong>{" "}
                              {message.response.description}
                            </p>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="py-3 px-3">
                        {renderMarkdown({ children: message.response })}
                      </div>
                    )}
                  </div>
                  {typeof message.response !== "object" && (
                    <button
                      className="ml-10 mt-1 relative bg-[#333444] rounded-2xl w-7 h-7 flex items-center justify-center text-white opacity-70 hover:opacity-100 focus:outline-none"
                      alt="Copy"
                      onClick={() => copyToClipboard(message.response)}
                    >
                      <BiSolidCopy />
                    </button>
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>

      <div className="fixed bottom-0 left-0 right-0 flex flex-col items-center justify-center px-6 pt-6 bg-[#1F1F1F] transition duration-300">
        <div className="relative w-full lg:w-[92%] xl:w-[45%]">
          <textarea
            ref={textareaRef}
            className={
              "w-full text-md sm:text-lg py-2 pl-6 pr-16 bg-[#2e2e2e] hover:border-2 hover:border-[#666666] text-white border-[#333333] focus:outline-none resize-none placeholder-[#888888] transition duration-300 " +
              (isInputMultiline ? "rounded-3xl" : "rounded-full")
            }
            placeholder="Message HikerAI"
            value={inputMessage}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            style={{
              overflowY: showScrollbar ? "auto" : "hidden",
              maxHeight: "250px",
              height: textAreaHeight,
              lineHeight: "30px",
              paddingTop: paddingHeight,
              paddingBottom: paddingHeight,
              boxSizing: "border-box",
              background: "#333333",
            }}
          />

          <button
            className={`absolute w-9 h-9 right-3.5 bottom-[1.1rem] sm:bottom-[0.95rem] md:bottom-[1.2rem] ml-2 px-3 py-3 bg-white text-black rounded-full hover:bg-gray-300 focus:outline-none flex items-center justify-center ${
              isSearchDisabled && !isSearching
                ? "opacity-20 bg-gray-400 hover:bg-gray-400 cursor-default"
                : ""
            } ${"sm:w-10 sm:h-10 sm:ml-0.5"}`}
            onClick={() => {
              if (isSearching) {
                cancelSearch();
              }

              if (isBotTyping) {
                stopBotTyping();
              }

              handleSendMessage();
            }}
            disabled={isSearchDisabled && !isSearching}
          >
            {isSearching ? (
              <FaSquare className="animate-pulse text-gray-800 flex-shrink-0 w-3 h-3 sm:w- sm:h-4" />
            ) : (
              <FaArrowUp className="flex-shrink-0 w-4 h-5" />
            )}
          </button>
        </div>
        <p className="cursor-default p-1 pb-2 text-[12px] sm:text-[14px] text-[#a8a8a8]">
          HikerAI can make mistakes. Check important info.
        </p>
      </div>
    </div>
  );
}

export default SearchPage;
