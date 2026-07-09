import { useRef, useEffect } from "react";
import { ChatMessage } from "./ChatMessage";
import './ChatMessages.css';

function ChatMessages({ chatMessages }) {

  function useAutoScroll(dependencies) {
    const chatMessagesRef = useRef(null);

    useEffect(() => {
      const containerElem = chatMessagesRef.current;
      if (containerElem) {
        containerElem.scrollTop = containerElem.scrollHeight;
      }
    }, [dependencies]);

    return chatMessagesRef;
  };

  const chatMessagesRef = useAutoScroll(chatMessages);
  return (
    <div
      className="chat-messages"
      ref={chatMessagesRef}
    >
      {chatMessages.length === 0 ? (
        <p className="empty-message-text">
          Welcome to the chatbot project! Send a message using the textbox below.
        </p>
      ) : chatMessages.map((chatMessage) => {
        return (
          <ChatMessage
            message={chatMessage.message}
            sender={chatMessage.sender}
            key={chatMessage.id}
          />
        )
      })}
    </div>
  )

};

export default ChatMessages;