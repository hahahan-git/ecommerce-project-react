import { useState } from "react";
import { Chatbot } from 'supersimpledev';
//kayanya kalau package tinggal langsung masukin nama filenya ga perlu banyak path kaya biasa(assumtion)
import loadGif from '../assets/loading-spinner.gif'
import './ChatInput.css';




export function ChatInput({ chatMessages, setChatMessages }) {

  const [inputText, setInputText] = useState('')
  const [loading, setLoading] = useState('');

  function saveInputText(event) {
    if (loading === "loading") {
      setInputText('');
      return;
    }
    setInputText(event.target.value);
  }

  async function sendMessage() {

    if (loading === 'loading' || inputText === '') return;

    const newMessage = [
      ...chatMessages,
      {
        message: inputText,
        sender: 'user',
        id: crypto.randomUUID()
      }
    ];

    setChatMessages(newMessage);
    setChatMessages([
      ...newMessage,
      {
        message: <img src={loadGif} className="loading-gif" />,
        sender: 'bot',
        id: crypto.randomUUID()
      }
    ]);

    setInputText('');
    setLoading('loading');
    const response = await Chatbot.getResponseAsync(inputText)
    setLoading('');

    setChatMessages([
      ...newMessage,
      {
        message: response,
        sender: 'bot',
        id: crypto.randomUUID()
      }
    ]);
  }

  function sendByEnter(event) {
    event.key === "Enter" && sendMessage();
    event.key === "Escape" && setInputText('');
  }

  function clearMessages() {
    setChatMessages([]);
  }

  return (
    <div className="chatInput">
      <input
        placeholder="Type a message"
        size="30"
        onChange={saveInputText}
        onKeyDown={sendByEnter}
        value={inputText}
        className="input-chatInput"
      />
      <button
        onClick={sendMessage}
        className="btn-chatInput"
      >Send</button>
      <button
        onClick={clearMessages}
        className="btn-chatInput dlt"
      >Clear</button>
    </div>
  )
};